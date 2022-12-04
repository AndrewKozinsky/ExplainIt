// import { ArticleRespType } from '../../../../api/src/types/generalResponse'
// import UpdateArticleDto from '../../../../api/src/modules/articles/dto/update-article.dto'
// import { makeFetch, RequestOptionsType } from 'requests/reqFn/fetch'
// import getApiUrl, { APIAddressesType } from 'requests/reqFn/apiUrls'
// import CreateArticleDto from '../../../../api/src/modules/articles/dto/create-article.dto'

// Объект с функциями запросов к статьям
/*export const articleRequests = {

	// Получение списка всех статей
	getAll: async function () {
		const urlKey: APIAddressesType = 'articles'
		const options: RequestOptionsType = { method: 'GET' }

		return await makeFetch<ArticleRespType.SuccessOrFailReturn<ArticleRespType.ArticleItem[]>>(
			getApiUrl(urlKey), options
		)
	},

	// Создание статьи
	createOne: async function (body: CreateArticleDto) {
		const urlKey: APIAddressesType = 'articles'
		const options: RequestOptionsType = { method: 'POST', body }

		return await makeFetch<ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]>>(
			getApiUrl(urlKey), options
		)
	},

	// Обновление статьи
	updateOne: async function (articleId: number, body: UpdateArticleDto) {
		const urlKey: APIAddressesType = 'article'
		const options: RequestOptionsType = {
			method: 'PATCH',
			body
		}

		return await makeFetch<ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]>>(
			getApiUrl(urlKey, articleId), options
		)
	},

	// Удаление статьи
	deleteOne: async function (articleId: number) {
		const urlKey: APIAddressesType = 'article'
		const options: RequestOptionsType = { method: 'DELETE' }

		return await makeFetch<ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]>>(
			getApiUrl(urlKey, articleId), options
		)
	}
}*/

export {}
