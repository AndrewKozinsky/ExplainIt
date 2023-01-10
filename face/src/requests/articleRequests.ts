// import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
// import { addresses } from 'requests/reqFn/apiUrls'
// import Types from 'types/Types'
import { makeFetch, RequestOptionsType } from './reqFn/fetch'
import { addresses } from './reqFn/apiUrls'
import Types from '../types/Types'

// Объект с функциями запросов к статьям
export const articleRequests = {
	// Получение всех статей
	getAll: async function () {
		const options: RequestOptionsType = { method: 'GET' }

		return await makeFetch<Types.Req.Article.GetAll>(
			addresses.articles, options
		)
	},

	// Получение статьи
	/*getOne: async function (articleId: number) {
		const options: RequestOptionsType = { method: 'GET' }

		return await makeFetch<Types.Req.Article.GetOne>(
			addresses.article(articleId), options
		)
	},*/

	// Создание статьи
	/*createOne: async function (body: Types.Req.Article.CreateOneDto) {
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<Types.Req.Article.CreateOne>(
			addresses.articles, options
		)
	},*/

	// Обновление статьи
	/*updateOne: async function (articleId: number, body: Types.Req.Article.UpdateOneDto) {
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<Types.Req.Article.UpdateOne>(
			addresses.article(articleId), options
		)
	},*/
}
