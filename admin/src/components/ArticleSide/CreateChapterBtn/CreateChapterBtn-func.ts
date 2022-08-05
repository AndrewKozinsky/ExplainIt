import useGetArticleSelectors from 'store/article/articleSelectors'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import { articleRequests } from 'requests/articles/articleRequests'
import store from 'store/store'
import CreateArticleDto from '../../../../../api/src/modules/articles/dto/create-article.dto'
import { ArticleRespType } from '../../../../../api/src/types/responseTypes'
import articleSlice from 'store/article/articleSlice'
import { IndexListItemType } from 'components/common/IndexList/IndexList'

export function useIsDisabled() {
	const { articles } = useGetArticleSelectors()

	return !articles
}

export async function createNewArticle() {
	const articlesArr = store.getState().article.articles

	const reqBody: CreateArticleDto = {
		name: 'New article',
		label: 'Label',
		published: false,
		summary: 'Краткое содержимое статьи',
		content: '',
		order: articlesArr?.length ? articlesArr.length + 1 : 1
	}

	try {
		const response = await articleRequests.createOne(reqBody)
		store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(true))

		if (response.status === 'success') {
			const newIndexListItem = transformArticleDataToIndexListItem(response.data.articles[0])
			store.dispatch(articleSlice.actions.insertNewArticle(newIndexListItem))
		}
		else if (response.status === 'fail' && response.message) {
			store.dispatch(globalErrorsSlice.actions.setError(response.message))
		}

		store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(true))
	}
	catch(err) {
		store.dispatch(globalErrorsSlice.actions.setError(
			'Возникла неизвестная ошибка при создании статьи.'
		))

		store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(true))
	}
}

function transformArticleDataToIndexListItem(articleData: ArticleRespType.Article): IndexListItemType {
	const indexListItem: IndexListItemType = {
		id: 1,
		name: 'name',
		payAtn: false,
		published: false,
		selected: false,
		order: 1
	}

	for (const prop in indexListItem) {
		if (prop in articleData) {
			// @ts-ignore
			indexListItem[prop] = articleData[prop]
		}
	}

	return indexListItem
}
