// import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
// import { addresses } from 'requests/reqFn/apiUrls'
// import Types from 'types/Types'

// Объект с функциями запросов к переводам
/*const translationRequests = {
	// Создание перевода
	createOne: async function (body: Types.Req.Translation.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.Translation.CreateOne>(
			addresses.translates, options
		)
	},

	// Обновление перевода
	updateOne: async function (translationId: number, body: Types.Req.Translation.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.Translation.UpdateOne>(
			addresses.translate(translationId), options
		)
	},

	// Удаление перевода
	deleteOne: async function (translationId: number) {
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<Types.Req.WritingProposal.DeleteOne>(
			addresses.translate(translationId), options
		)
	},
}*/

// export default translationRequests
export {}
