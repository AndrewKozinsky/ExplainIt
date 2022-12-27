import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
import { addresses } from 'requests/reqFn/apiUrls'
import Types from 'types/Types'

// Объект с функциями запросов к статьям
const oralProposalRequests = {

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

	// Создание голосового предложения
	createOne: async function (body: Types.Req.OralProposal.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.OralProposal.CreateOne>(
			addresses.oralProposals, options
		)
	},

	// Обновление предложения
	updateOne: async function (proposalId: number, body: Types.Req.Article.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.OralProposal.UpdateOne>(
			addresses.oralProposal(proposalId), options
		)
	},

	// Удаление предложения
	deleteOne: async function (proposalId: number) {
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<Types.Req.OralProposal.DeleteOne>(
			addresses.oralProposal(proposalId), options
		)
	},
}

export default oralProposalRequests
