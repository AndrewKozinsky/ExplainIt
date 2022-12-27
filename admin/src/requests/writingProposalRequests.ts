import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
import { addresses } from 'requests/reqFn/apiUrls'
import Types from 'types/Types'

// Объект с функциями запросов к статьям
const writingProposalRequests = {

	// Получение всех статей
	/*getAll: async function () {
		const options: RequestOptionsType = { method: 'GET' }

		return await makeFetch<Types.Req.Article.GetAll>(
			addresses.articles, options
		)
	},*/

	// Получение статьи
	/*getOne: async function (proposalId: number) {
		const options: RequestOptionsType = { method: 'GET' }

		return await makeFetch<Types.Req.Article.GetOne>(
			addresses.article(proposalId), options
		)
	},*/

	// Создание письменного предложения
	createOne: async function (body: Types.Req.WritingProposal.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.OralProposal.CreateOne>(
			addresses.writingProposals, options
		)
	},

	// Обновление письменного предложения
	updateOne: async function (proposalId: number, body: Types.Req.WritingProposal.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.WritingProposal.UpdateOne>(
			addresses.writingProposal(proposalId), options
		)
	},

	// Удаление письменного предложения
	deleteOne: async function (proposalId: number) {
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<Types.Req.WritingProposal.DeleteOne>(
			addresses.writingProposal(proposalId), options
		)
	},
}

export default writingProposalRequests
