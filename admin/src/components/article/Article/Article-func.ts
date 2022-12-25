import { useEffect } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleService from '../../../services/article'

// Запрашивает выбранную статью и ставит в Хранилище
export function useSetArticleInStore() {
	const { articleId } = useGetArticleSelectors()

	useEffect(function () {
		if (!articleId) return

		articleService.requestArticleAndSetToStore(articleId)
	}, [articleId])
}

