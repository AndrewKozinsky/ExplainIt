import store from 'store/store'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import { proposalGroupRequests } from 'requests/proposalGroupRequests'
import articleService from './article.service'
import articleSlice from 'store/article/articleSlice'
import { removeFromLocalStorage } from 'utils/miscUtils'
import { saveAppDataToLocalStorage } from '../components/main/App/func/restoreStateFunc'
import findService from 'services/find.service'

const proposalGroupService = {
	async createGroup(groupType: Types.Entity.Group.GroupType) {
		const { article, articleId } = store.getState().article
		if (!article || !articleId) return

		const reqBody: Types.Req.ProposalGroup.CreateOneDto = {
			articleId,
			type: groupType,
			order: this.getMaxOrderNum(article) + 1
		}

		try {
			const response = await proposalGroupRequests.createOne(reqBody)

			if (response.status === 'success') {
				await articleService.requestArticleAndSetToStore(articleId)
			}
			else if (response.status === 'fail' || response.status === 'error') {
				if (response.message) {
					store.dispatch(globalErrorsSlice.actions.setError(response.message))
				}

			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании группы упражнений.'
			))
		}
	},

	// Возвращает максимальное значение свойства order у объектов групп упражнений
	getMaxOrderNum(article:  Types.Req.Article.FullArticle) {
		const groups = article.proposalsGroups

		if (groups.length) {
			return groups[groups.length - 1].order
		}
		else {
			return 0
		}
	},

	/** Получение выделенной группы упражнений */
	getSelectedGroup() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return null

		return findService.findGroupInArticle(article, currentGroupId)
	},

	/**
	 * Выделение группы
	 * @param {Number} groupId — id группы предложений
	 * @param {String} groupType — тип группы: oral или writing
	 */
	select(groupId: number, groupType: Types.Entity.Group.GroupType) {
		store.dispatch(
			articleSlice.actions.setGroup({ groupId, groupType })
		)
		store.dispatch(
			articleSlice.actions.setProposalId(null)
		)

		// Сохранить id выделенной группы и её тип в LocalStorage
		// чтобы при загрузке страницы снова её выделить
		saveAppDataToLocalStorage('groupId', groupId)
		saveAppDataToLocalStorage('groupType', groupType)
	},

	/**
	 * Удаление группы предложений
	 * @param {Number} groupId — id группы предложений
	 */
	async delete(groupId: number) {
		const { articleId, currentGroupId } = store.getState().article
		if (!articleId) return

		try {
			// Сделать запрос на удаление группы в БД и в Хранилище
			const response = await proposalGroupRequests.deleteOne(groupId)

			if (response.status === 'success') {
				// Если удалили выделенную группу, то обнулять выделение
				if (currentGroupId === groupId) {
					removeFromLocalStorage('groupType')
					removeFromLocalStorage('groupId')
					removeFromLocalStorage('proposalId')

					store.dispatch( articleSlice.actions.setGroup({ groupId: null, groupType: null }) )
					store.dispatch( articleSlice.actions.setProposalId(null) )
				}

				// Удалить группу в Хранилище
				store.dispatch(articleSlice.actions.deleteGroup(groupId))

				// Актуализировать порядковый номер в группах
				await this.updateGroupOrderProp()
			}
			else if (response.status === 'fail' || response.status === 'error') {
				if (response.message) {
					store.dispatch(globalErrorsSlice.actions.setError(response.message))
				}
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError(
					'Возникла неизвестная ошибка при удалении группы предложений.'
				)
			)
		}
	},

	/**
	 * После изменения порядка групп в списке нужно актуализировать свойство order
	 * чтобы значения шли по текущему порядку.
	 * Функция обновляет значение свойства order и в данных статьи на сервере и в Хранилище.
	 */
	updateGroupOrderProp() {
		const groupsList = store.getState().article.article?.proposalsGroups
		if (!groupsList?.length) return

		groupsList.forEach((group, i) => {
			const counter = i + 1

			if (group.order !== counter) {
				// Сделать запрос на обновление порядкового номера группы
				this.requestUpdateGroup(group.id, { order: counter })

				// Обновить порядковый номер группы в Хранилище
				store.dispatch(articleSlice.actions.updateGroupListItem(
					{ groupId: group.id, newProps: { order: counter } }
				))
			}
		})
	},

	/**
	 * Функция обновляет свойства у статьи на сервере
	 * @param {Number} groupId — id группы предложений
	 * @param {Object} body — объект с данными, которые нужно поставить в статью
	 */
	async requestUpdateGroup(groupId: number, body: Types.Req.Article.UpdateOneDto) {
		try {
			// Сделать запрос на обновление статьи
			const response = await proposalGroupRequests.updateOne(groupId, body)

			if (response.status === 'fail' || response.status === 'error') {
				if (response.message) {
					store.dispatch(globalErrorsSlice.actions.setError(response.message))
				}
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при обновлении главы.')
			)
		}
	},

	/**
	 * Функция запускаемая при изменении порядка статьи в списке
	 * @param {Number} groupId — id группы предложений
	 * @param {String} direction — направление перемещения
	 */
	changeOrder(groupId: number, direction: 'up' | 'down' ) {
		const article = store.getState().article.article
		if (!article) return

		const groups = article.proposalsGroups
		const group = groups.find(gr => gr.id == groupId)
		if (!group) return

		if (!this.canChangeOrder(groups, groupId, direction)) {
			return
		}

		store.dispatch(
			articleSlice.actions.changeOrderGroupListItem(
				{ groupId: group.id, direction }
			)
		)

		this.updateGroupOrderProp()
	},

	/**
	 * Можно ли переместить группу вверх или вниз
	 * @param {Array} groups — массив групп предложений
	 * @param {Number} groupId — id группы предложений
	 * @param {String} direction — направление перемещения
	 */
	canChangeOrder(
		groups: Types.Req.ProposalGroup.Group[],
		groupId: number,
	    direction: 'up' | 'down'
	) {
		const groupIdx = groups.findIndex(g => g.id == groupId)

		return (
			(direction === 'up' && groupIdx > 0) ||
			(direction === 'down' && groupIdx < groups.length -1)
		)
	}
}

export default proposalGroupService