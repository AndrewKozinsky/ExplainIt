import { useEffect } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleService from 'services/article.service'

/**
 * Хук отслеживает изменение свойства needToLoadAllArticles из store.articles.
 * И если оно в true, то скачивает список статей и ставит в Хранилище.
 */
export function useRequestArticles(): void {
	const { needToLoadAllArticles } = useGetArticleSelectors()

	useEffect(() => {
		if (needToLoadAllArticles) {
			articleService.requestArticlesAndSetToStore()
		}
	}, [needToLoadAllArticles])
}

// Функция удаления статьи
export function deleteArticle(articleId: number) {
	const confirmed = confirm('Вы уверены в удалении статьи')

	if (confirmed) {
		articleService.deleteArticle(articleId)
	}
}
