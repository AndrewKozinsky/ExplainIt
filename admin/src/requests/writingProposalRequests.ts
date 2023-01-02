import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
import { addresses } from 'requests/reqFn/apiUrls'
import Types from 'types/Types'

// Объект с функциями запросов к письменным предложениям
const writingProposalRequests = {
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

	// Добавление необработанного перевода в письменное предложение
	addRawProposal: async function (
		proposalId: number, body: Types.Req.WritingProposal.RawTranslateDTO
	) {
		const options: RequestOptionsType = {
			method: 'DELETE',
			body
		}

		return await makeFetch<Types.Req.WritingProposal.UpdateOne>(
			addresses.writingProposalRawTranslate(proposalId), options
		)
	},

	// Удаление необработанного перевода в письменное предложение
	removeRawProposal: async function (
		proposalId: number, body: Types.Req.WritingProposal.RawTranslateDTO
	) {
		const options: RequestOptionsType = {
			method: 'DELETE',
			body
		}

		return await makeFetch<Types.Req.WritingProposal.UpdateOne>(
			addresses.writingProposalRawTranslate(proposalId), options
		)
	}
}

export default writingProposalRequests
