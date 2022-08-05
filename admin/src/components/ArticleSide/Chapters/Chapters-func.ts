import { useEffect } from 'react'
import articleSlice from 'store/article/articleSlice'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import store from 'store/store'
import useGetArticleSelectors from 'store/article/articleSelectors'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import { articleRequests } from 'requests/articles/articleRequests'
import UpdateArticleDto from '../../../../../api/src/modules/articles/dto/update-article.dto'
import { restoreStateFromLocalStorage, saveAppDataToLocalStorage } from 'components/App/App-restoreStateFunc'


/**
 * Хук отслеживает изменение свойства needToLoadAllArticles из store.articles.
 * И если оно в true, то скачивает список статей и ставит в Хранилище.
 */
export function useRequestArticles(): void {
	const dispatch = useDispatch()
	const { needToLoadAllArticles } = useGetArticleSelectors()

	useEffect(() => {
		if (needToLoadAllArticles) {
			requestArticles(dispatch).then(() => {
				dispatch(articleSlice.actions.setNeedToLoadAllArticles(false))
			})
		}
	}, [needToLoadAllArticles])
}

/**
 * Функция получает список статей и помещает в Хранилище
 * @param {Object} dispatch — функция-диспетчер Редакса
 */
async function requestArticles(dispatch: Dispatch): Promise<void> {
	try {
		const response = await articleRequests.getAll()

		if (response.status === 'success') {
			dispatch(
				articleSlice.actions.setArticles(response.data.articles)
			)
		}
		else if (response.status === 'fail') {
			dispatch(articleSlice.actions.setArticles([]))

			if (response.message) {
				dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}

		dispatch(articleSlice.actions.setNeedToLoadAllArticles(false))
	}
	catch(err) {
		dispatch(articleSlice.actions.setArticles([]))
		dispatch(globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при получении списка глав.'))

		dispatch(articleSlice.actions.setNeedToLoadAllArticles(false))
	}
}

/**
 * Обработчик щелчка по статьи в списке статей. Ставит в Хранилище, что статья выделена.
 * @param articleId
 */
export function onItemClick(articleId: number) {
	store.dispatch(
		articleSlice.actions.setSelectedArticleId(articleId)
	)

	// Сохранить id выделенной статьи в LocalStorage чтобы при загрузке страницы снова её выделить
	saveAppDataToLocalStorage('articleId', articleId)
}


/**
 * Функция удаляющая статью
 * @param {Number} articleId — id статьи
 */
export async function deleteArticle(articleId: number) {
	try {
		// Сделать запрос на удаление статьи
		const response = await articleRequests.deleteOne(articleId)

		if (response.status === 'success') {
			// Если удалили выделенную статью, то обнулять выделение
			const selectedArticleId = store.getState().article.selectedArticleId

			if (selectedArticleId === articleId) {
				store.dispatch( articleSlice.actions.setSelectedArticleId(null) )
			}

			// Удалить элемент из массива статей
			store.dispatch( articleSlice.actions.deleteArticle(articleId) )

			// Актуализировать порядковый номер в статьях
			updateArticlesOrderProp()
		}
		else if (response.status === 'fail') {
			if (response.message) {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
	}
	catch(err) {
		store.dispatch(globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при удалении главы.'))
	}
}


/**
 * Функция обновляет свойства у статьи на сервере
 * @param {Number} articleId — id статьи
 * @param {Object} body — объект с данными, которые нужно поставить в статью
 */
async function requestUpdateArticle(articleId: number, body: UpdateArticleDto) {
	try {
		// Сделать запрос на обновление статьи
		const response = await articleRequests.updateOne(articleId, body)

		if (response.status === 'fail') {
			if (response.message) {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
	}
	catch(err) {
		store.dispatch(globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при обновлении главы.'))
	}
}


/**
 * После изменения порядка статей в списке нужно актуализировать свойство order чтобы значения шли по текущему порядку.
 * Функция обновляет значение свойства order и в данных статьи на сервере и в Хранилище.
 */
function updateArticlesOrderProp() {
	const articlesList = store.getState().article.articles
	if (!articlesList) return

	articlesList.forEach((article, i) => {
		if (article.order !== i + 1) {
			// Сделать запрос на обновление порядкового номера статьи
			requestUpdateArticle(article.id, { order: i + 1 })

			// Обновить порядковый номер статьи в Хранилище
			store.dispatch(articleSlice.actions.updateArticleListItem(
				{ articleId: article.id, newProps: { order: i + 1 } }
			))
		}
	})
}


/**
 * Функция запускаемая при изменении порядка статьи в списке
 * @param {Number} articleId — id статьи
 * @param {String} direction — направление перемещения
 */
export function changeArticleOrder(
	articleId: number,
	direction: 'up' | 'down',
) {
	const articlesList = store.getState().article.articles
	if (!articlesList) return

	const articleIdx = articlesList.findIndex(art => art.id === articleId)
	if (articleIdx === -1) return

	if (
		(direction === 'up' && articleIdx > 0) ||
		(direction === 'down' && articleIdx < articlesList.length -1)
	) {
		store.dispatch(
			articleSlice.actions.changeOrderArticleListItem(
				{ articleId: articlesList[articleIdx].id, direction }
			)
		)

		updateArticlesOrderProp()
	}
}


/**
 * Хук при загрузке страницы запускает функцию восстанавливающую значения Хранилища
 */
export function useRestoreAppState() {
	useEffect(() => {
		restoreStateFromLocalStorage()
	}, [])
}
