import useGetArticleSelectors from 'store/article/articleSelectors'
import { useEffect } from 'react'
import articleService from '../../../services/article'

export function useSetArticleInStore() {
	const { selectedArticleId } = useGetArticleSelectors()

	useEffect(function () {
		if (!selectedArticleId) return

		articleService.requestArticleAndSetToStore(selectedArticleId)
	}, [selectedArticleId])
}
