import { useEffect } from 'react'
import { restoreStateFromLocalStorage } from 'components/main/App/App-restoreStateFunc'
// import { useDispatch } from 'react-redux'
import useGetArticleSelectors from 'store/article/articleSelectors'
import articleService from '../../../services/article'

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

/** Хук при загрузке страницы запускает функцию восстанавливающую значения Хранилища */
export function useRestoreAppState() {
	useEffect(() => {
		restoreStateFromLocalStorage()
	}, [])
}

// Функция удаления статьи
export function deleteArticle(articleId: number) {
	const confirmed = confirm('Вы уверены в удалении статьи')

	if (confirmed) {
		articleService.deleteArticle(articleId)
	}
}
