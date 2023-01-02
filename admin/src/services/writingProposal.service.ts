import store from 'store/store'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import writingProposalRequests from 'requests/writingProposalRequests'
import articleService from 'services/article.service'
import findService from 'services/find.service'
import articleSlice from 'store/article/articleSlice'

const writingProposalService = {
	// Создание письменного предложения
	/*async createProposal() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return

		const group = findService.findGroupInArticle(article, currentGroupId)
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
	},*/

	/**
	 * Удаление перевода из массива необработанных переводов письменного предложения
	 * @param {Number} proposalId — id письменного предложения
	 * @param {String} rawTranslation — вариант перевода, который нужно удалить
	 */
	/*async removeRawTranslation(proposalId: number, rawTranslation: string) {
		const reqBody: Types.Req.WritingProposal.RawTranslateDTO = {
			text: rawTranslation
		}

		try {
			const response = await writingProposalRequests.removeRawProposal(proposalId, reqBody)

			if (response.status === 'success') {
				store.dispatch(
					articleSlice.actions.removeRawTranslate(rawTranslation)
				)
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
	},*/

	/**
	 * Удаление перевода из массива необработанных переводов письменного предложения
	 * @param {Number} proposalId — id письменного предложения
	 * @param {String} rawTranslations — массив с неподходящими переводами, которые нужно обновить
	 */
	/*async updateBadTranslations(proposalId: number, rawTranslations: string[]) {
		const reqBody: Types.Req.WritingProposal.UpdateOneDto = {
			badTranslations: rawTranslations
		}

		try {
			const response = await writingProposalRequests.updateOne(proposalId, reqBody)

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании письменного предложения.'
			))
		}
	},*/
}

export default writingProposalService
