import { Dispatch } from 'redux'
import { articleRequests } from 'requests/articles/articleRequests'
import articleSlice from 'store/article/articleSlice'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import { IndexListItemType } from 'components/common/IndexList/IndexList'
import store from 'store/store'
import { saveAppDataToLocalStorage } from 'components/main/App/App-restoreStateFunc'

const articleService = {
	/**
	 * Функция получает список статей и помещает в Хранилище
	 * @param {Object} dispatch — функция-диспетчер Редакса
	 */
	async requestArticlesAndSetToStore(dispatch: Dispatch) {
		try {
			const response = await articleRequests.getAll()

			if (response.status === 'success') {
				const indexListData = this.artsListDataFromServerToIndexListData(response.data.articles)

				dispatch(
					articleSlice.actions.setArticles(indexListData)
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
	},

	/**
	 * Переводит массив статей полученный с сервера в формат данных для отрисовки компонентом IndexList.
	 * @param {Array} articlesList — список статей присланный с сервера
	 */
	artsListDataFromServerToIndexListData(articlesList: Types.Req.Article.ArticleListItem[]): IndexListItemType[] {
		return  articlesList.map(article => {
			return {
				id: article.id,
				name: article.name,
				payAtn: article.payAtn || false,
				published: article.published,
				selected: false,
				order: article.order
			}
		})
	},

	/**
	 * Выделение статьи
	 * @param {Number} articleId — id выделяемой статьи
	 */
	select(articleId: number) {
		store.dispatch(
			articleSlice.actions.setSelectedArticleId(articleId)
		)

		// Сохранить id выделенной статьи в LocalStorage чтобы при загрузке страницы снова её выделить
		saveAppDataToLocalStorage('articleId', articleId)
	},

	/**
	 * Удаление статьи
	 * @param {Number} articleId — id статьи
	 */
	async delete(articleId: number) {
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
				this.updateArticlesOrderProp()
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
	},

	/**
	 * После изменения порядка статей в списке нужно актуализировать свойство order чтобы значения шли по текущему порядку.
	 * Функция обновляет значение свойства order и в данных статьи на сервере и в Хранилище.
	 */
	updateArticlesOrderProp() {
		const articlesList = store.getState().article.articles
		if (!articlesList) return

		articlesList.forEach((article, i) => {
			if (article.order !== i + 1) {
				// Сделать запрос на обновление порядкового номера статьи
				this.requestUpdateArticle(article.id, { order: i + 1 })

				// Обновить порядковый номер статьи в Хранилище
				/*store.dispatch(articleSlice.actions.updateArticleListItem(
					{ articleId: article.id, newProps: { order: i + 1 } }
				))*/
			}
		})
	},

	/**
	 * Функция обновляет свойства у статьи на сервере
	 * @param {Number} articleId — id статьи
	 * @param {Object} body — объект с данными, которые нужно поставить в статью
	 */
	async requestUpdateArticle(articleId: number, body: Types.Req.Article.UpdateOneDto) {
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
	},

	/**
	 * Функция запускаемая при изменении порядка статьи в списке
	 * @param {Number} articleId — id статьи
	 * @param {String} direction — направление перемещения
	 */
	changeOrder(articleId: number, direction: 'up' | 'down' ) {
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

			console.log(this)
			// this.updateArticlesOrderProp()
		}
	}
}

export default articleService
