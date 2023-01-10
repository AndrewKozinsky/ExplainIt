// import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
// import { addresses } from 'requests/reqFn/apiUrls'
// import Types from 'types/Types'

// Объект с функциями запросов к словам
/*const wordRequests = {
	// Создание слова
	createOne: async function (body: Types.Req.Word.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.Word.CreateOne>(
			addresses.words, options
		)
	},

	// Обновление слова
	updateOne: async function (wordId: number, body: Types.Req.Word.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.Word.UpdateOne>(
			addresses.word(wordId), options
		)
	},

	// Удаление слова
	deleteOne: async function (wordId: number) {
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<Types.Req.Word.DeleteOne>(
			addresses.word(wordId), options
		)
	},
}*/

// export default wordRequests
export {}
