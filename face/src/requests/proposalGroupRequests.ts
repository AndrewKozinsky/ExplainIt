// import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
// import { addresses } from 'requests/reqFn/apiUrls'
// import Types from 'types/Types'

// Объект с функциями запросов к группам предложений
/*export const proposalGroupRequests = {

	// Создание группы предложений
	createOne: async function (body: Types.Req.ProposalGroup.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.ProposalGroup.CreateOne>(
			addresses.groups, options
		)
	},

	// Обновление группы
	updateOne: async function (groupId: number, body: Types.Req.ProposalGroup.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.ProposalGroup.UpdateOne>(
			addresses.group(groupId), options
		)
	},

	// Удаление группы предложений
	deleteOne: async function (groupId: number) {
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<Types.Req.ProposalGroup.DeleteOne>(
			addresses.group(groupId), options
		)
	},
}*/
export {}
