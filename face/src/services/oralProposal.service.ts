// import store from 'store/store'
// import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
// import Types from '../types/Types'
// import articleService from 'services/article.service'
// import findService from 'services/find.service'
// import oralProposalRequests from 'requests/oralProposalRequests'

const oralProposalService = {
	// Создание голосового предложения
	/*async createProposal() {
		const { article, currentGroupId } = store.getState().article
		if (!article || !currentGroupId) return

		const group = findService.findGroupInArticle(article, currentGroupId)
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
	},*/
}

export default oralProposalService
