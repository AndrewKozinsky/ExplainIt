import store from 'store/store'
import articleSlice from 'store/article/articleSlice'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import { IndexListItemType } from 'components/common/IndexList/IndexList'
import { saveAppDataToLocalStorage } from 'components/main/App/func/restoreStateFunc'
import proposalGroupService from 'services/proposalGroup'
import oralProposalRequests from 'requests/oralProposalRequests'
import writingProposalRequests from 'requests/writingProposalRequests'
import articleService from 'services/article'
import ModelTypes from '../../../api/src/types/modelTypes'
import { removeFromLocalStorage } from 'utils/miscUtils'

const proposalService = {
	// Создание предложения
	async createProposal() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return

		const group = proposalGroupService.findById(article, currentGroupId)
		if (!group) return

		if (group.type == 'oral') {
			await this.createOralProposal()
		}
		else if (group.type == 'writing') {
			await this.createWritingProposal()
		}
	},

	// Создание голосового предложения
	async createOralProposal() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return

		const group = proposalGroupService.findById(article, currentGroupId)
		if (!group) return

		const reqBody: Types.Req.OralProposal.CreateOneDto = {
			rusProposal: 'Новое предложение',
			engProposal: 'New proposal',
			order: group.oralProposals.length + 1,
			proposalsGroupId: currentGroupId,
		}

		try {
			const response = await oralProposalRequests.createOne(reqBody)

			if (response.status === 'success') {
				await articleService.requestArticleAndSetToStore(article.id)
			}
			else {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании голосового предложения.'
			))
		}
	},

	// Создание письменного предложения
	async createWritingProposal() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return

		const group = proposalGroupService.findById(article, currentGroupId)
		if (!group) return

		const reqBody: Types.Req.WritingProposal.CreateOneDto = {
			rusProposal: 'Новое предложение',
			badTranslations: [],
			rawTranslations: [],
			order: group.oralProposals.length + 1,
			proposalsGroupId: currentGroupId,
		}

		try {
			const response = await writingProposalRequests.createOne(reqBody)

			if (response.status === 'success') {
				await articleService.requestArticleAndSetToStore(article.id)
			}
			else {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании письменного предложения.'
			))
		}
	},

	/**
	 * Переводит массив статей полученный с сервера в формат данных для отрисовки компонентом IndexList.
	 * @param {Array} proposals — список предложений
	 */
	proposalsListDataFromServerToIndexListData(
		proposals: (Types.Entity.OralProposal.Item[] | Types.Entity.WritingProposal.Item[])
	): IndexListItemType[] {
		return  proposals.map(proposal => {
			return {
				id: proposal.id,
				name: proposal.rusProposal,
				payAtn: proposal.payAtn || false,
				published: proposal.published,
				selected: false,
				order: proposal.order
			}
		})
	},

	/**
	 * Выделение статьи
	 * @param {Number} proposalId — id текущего предложения
	 */
	select(proposalId: number) {
		store.dispatch(
			articleSlice.actions.setProposalId(proposalId)
		)

		// Сохранить id выделенного предложения в LocalStorage чтобы при загрузке страницы снова его выделить
		saveAppDataToLocalStorage('proposalId', proposalId)
	},

	/**
	 * Удаление предложения
	 * @param {Number} proposalId — id предложения
	 * @param {String} proposalType — тип предложения (голосовое или письменное)
	 */
	async delete(proposalId: number, proposalType: ModelTypes.ProposalGroup.GroupType) {
		try {
			let response: Types.Req.OralProposal.DeleteOne | Types.Req.WritingProposal.DeleteOne

			// Сделать запрос на удаление предложения в зависимости от типа
			if (proposalType == 'oral') {
				response = await oralProposalRequests.deleteOne(proposalId)
			}
			else {
				response = await writingProposalRequests.deleteOne(proposalId)
			}

			if (response.status === 'success') {
				// Если удалили выделенное предложение, то обнулять выделение
				const selectedProposalId = store.getState().article.currentProposalId

				if (selectedProposalId === proposalId) {
					removeFromLocalStorage('proposalId')

					store.dispatch( articleSlice.actions.setProposalId(null) )
				}

				// Удалить предложение в Хранилище
				const { currentGroupId } = store.getState().article
				if (!currentGroupId) return

				store.dispatch(
					articleSlice.actions.deleteProposal({ groupId: currentGroupId, proposalId })
				)

				// Актуализировать порядковый номер в предложениях
				this.updateProposalOrderProp()
			}
			else {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при удалении предложения.'))
		}
	},

	/**
	 * После изменения порядка статей в списке нужно актуализировать свойство order чтобы значения шли по текущему порядку.
	 * Функция обновляет значение свойства order и в данных статьи на сервере и в Хранилище.
	 */
	updateProposalOrderProp() {
		const { article, currentGroupId, currentGroupType } = store.getState().article
		if (!article || !currentGroupId || !currentGroupType) return

		const proposals = this.findAll(article, currentGroupId)
		if (!proposals) return

		proposals.forEach((proposal, i) => {
			const counter = i + 1

			if (proposal.order !== counter) {
				// Сделать запрос на обновление порядкового номера предложения
				this.requestUpdateProposal(proposal.id, currentGroupType, { order: counter })

				// Обновить порядковый номер предложения в Хранилище
				store.dispatch(articleSlice.actions.updateGroupListItem(
					{ groupId: currentGroupId, newProps: { order: counter } }
				))
			}
		})
	},

	// Поиск всех предложений указанной группы
	findAll(article:  Types.Req.Article.FullArticle, groupId: number) {
		const group = proposalGroupService.findById(article, groupId)
		if (!group) return

		if (group.type === 'oral') {
			return group.oralProposals
		}
		else {
			return group.writingProposals
		}
	},

	/**
	 * Функция обновляет свойства у предложения на сервере
	 * @param {Number} proposalId — id предложения
	 * @param {String} proposalType — тип предложения: oral или writing
	 * @param {Object} body — объект с данными, которые нужно поставить в статью
	 */
	async requestUpdateProposal(
		proposalId: number,
		proposalType: ModelTypes.ProposalGroup.GroupType,
		body: Types.Req.OralProposal.UpdateOneDto | Types.Req.WritingProposal.UpdateOneDto
	) {
		try {
			let response: Types.Req.OralProposal.UpdateOne | Types.Req.WritingProposal.UpdateOne

			if (proposalType == 'oral') {
				response = await oralProposalRequests.updateOne(proposalId, body)
			}
			else {
				response = await writingProposalRequests.updateOne(proposalId, body)
			}

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при обновлении предложения.'))
		}
	},

	/**
	 * Функция запускаемая при изменении порядка статьи в списке
	 * @param {Number} articleId — id статьи
	 * @param {String} direction — направление перемещения
	 */
	changeOrder(articleId: number, direction: 'up' | 'down' ) {
		// const articlesList = store.getState().article.articles
		// if (!articlesList) return

		// const articleIdx = articlesList.findIndex(art => art.id === articleId)
		// if (articleIdx === -1) return

		/*if (
			(direction === 'up' && articleIdx > 0) ||
			(direction === 'down' && articleIdx < articlesList.length -1)
		) {
			store.dispatch(
				articleSlice.actions.changeOrderArticleListItem(
					{ articleId: articlesList[articleIdx].id, direction }
				)
			)

			this.updateArticlesOrderProp()
		}*/
	},

	// Поиск группы предложений по идентификатору
	findByIdInGroup(
		group: Types.Req.ProposalGroup.Group,
		proposalType: ModelTypes.ProposalGroup.GroupType,
		proposalId: number
	) {
		if (proposalType == 'oral') {
			return group.oralProposals.find(proposal => {
				return proposal.id == proposalId
			})
		}
		else {
			return group.writingProposals.find(proposal => {
				return proposal.id == proposalId
			})
		}
	},
}

export default proposalService
