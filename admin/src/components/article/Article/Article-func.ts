import useGetArticleSelectors from 'store/article/articleSelectors'
import { useEffect } from 'react'
import articleService from '../../../services/article'

export function useSetArticleInStore() {
	const { articleId } = useGetArticleSelectors()

	useEffect(function () {
		if (!articleId) return

		articleService.requestArticleAndSetToStore(articleId)
	}, [articleId])
}
