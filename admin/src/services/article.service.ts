import store from 'store/store'
import { articleRequests } from 'requests/articleRequests'
import articleSlice from 'store/article/articleSlice'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import { removeFromLocalStorage } from 'utils/miscUtils'
import { IndexListItemType } from '../components/common/IndexList/IndexList'
import { saveAppDataToLocalStorage } from '../components/main/App/func/restoreStateFunc'

const articleService = {
	// Создание статьи
	async createArticle() {
		const articlesArr = store.getState().article.articles

		const reqBody: Types.Req.Article.CreateOneDto = {
			name: 'New article',
			chapter: 'Не известно',
			published: false,
			summary: 'Краткое содержимое статьи',
			order: articlesArr?.length ? articlesArr.length + 1 : 1
		}

		try {
			const response = await articleRequests.createOne(reqBody)
			store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(true))

			if (response.status === 'success') {
				const newIndexListItemArr = this.artsListDataFromServerToIndexListData([response.data.articles])
				store.dispatch(articleSlice.actions.insertNewArticle(newIndexListItemArr[0]))
			}
			else {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании статьи.'
			))
		}
	},

	/** Функция запрашивает с сервера список статей и помещает в Хранилище */
	async requestArticlesAndSetToStore() {
		try {
			const response = await articleRequests.getAll()

			if (response.status === 'success') {
				const indexListData = this.artsListDataFromServerToIndexListData(response.data.articles)

				store.dispatch(
					articleSlice.actions.setArticles(indexListData)
				)
			}
			else {
				store.dispatch(articleSlice.actions.setArticles([]))
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}

			store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(false))
		}
		catch(err) {
			store.dispatch(articleSlice.actions.setArticles([]))
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при получении списка глав.'
			))

			store.dispatch(articleSlice.actions.setNeedToLoadAllArticles(false))
		}
	},

	/**
	 * Переводит массив статей полученный с сервера в формат данных
	 * для отрисовки компонентом IndexList.
	 * @param {Array} articlesList — список статей присланный с сервера
	 */
	artsListDataFromServerToIndexListData(
		articlesList: Types.Entity.Article.ListItem[]
	): IndexListItemType[] {
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
	 * @param {Number} articleId — id текущей статьи
	 */
	selectArticle(articleId: number) {
		store.dispatch(
			articleSlice.actions.setArticleId(articleId)
		)
		store.dispatch(
			articleSlice.actions.setArticleStatus('pending')
		)

		// Сохранить id выделенной статьи в LocalStorage чтобы при загрузке страницы снова её выделить
		saveAppDataToLocalStorage('articleId', articleId)
	},

	/**
	 * Удаление статьи
	 * @param {Number} articleId — id статьи
	 */
	async deleteArticle(articleId: number) {
		try {
			// Сделать запрос на удаление статьи
			const response = await articleRequests.deleteOne(articleId)

			if (response.status === 'success') {
				// Если удалили выделенную статью, то обнулять выделение
				const selectedArticleId = store.getState().article.articleId

				if (selectedArticleId === articleId) {
					removeFromLocalStorage('articleId')
					removeFromLocalStorage('groupType')
					removeFromLocalStorage('groupId')
					removeFromLocalStorage('proposalId')

					store.dispatch( articleSlice.actions.setArticleId(null) )
					store.dispatch( articleSlice.actions.setArticle(null) )
					store.dispatch( articleSlice.actions.setGroup({ groupId: null, groupType: null }) )
					store.dispatch( articleSlice.actions.setProposalId(null) )
				}

				// Удалить элемент из массива статей
				store.dispatch( articleSlice.actions.deleteArticle(articleId) )

				// Актуализировать порядковый номер в статьях
				this.updateArticlesOrderProp()
			}
			else {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при удалении главы.')
			)
		}
	},

	/**
	 * После изменения порядка статей в списке нужно актуализировать свойство order
	 * чтобы значения шли по текущему порядку.
	 * Функция обновляет значение свойства order и в данных статьи на сервере и в Хранилище.
	 */
	updateArticlesOrderProp() {
		const articlesList = store.getState().article.articles
		if (!articlesList) return

		articlesList.forEach((article, i) => {
			const thisOrder = i + 1

			if (article.order !== thisOrder) {
				// Сделать запрос на обновление порядкового номера статьи
				this.requestUpdateArticle(article.id, { order: thisOrder })

				// Обновить порядковый номер статьи в Хранилище
				store.dispatch(articleSlice.actions.updateArticleListItem(
					{ articleId: article.id, newProps: { order: thisOrder } }
				))
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

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при обновлении главы.')
			)
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

			this.updateArticlesOrderProp()
		}
	},

	/** Функция получает статью и помещает в Хранилище в качестве текущей */
	async requestArticleAndSetToStore(articleId: number) {
		try {
			const response = await articleRequests.getOne(articleId)

			if (response.status === 'success') {
				store.dispatch(
					articleSlice.actions.setArticle(response.data.articles)
				)
				store.dispatch(
					articleSlice.actions.setArticleStatus('downloaded')
				)
			}
			else {
				store.dispatch(articleSlice.actions.setArticles([]))
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
				store.dispatch(articleSlice.actions.setArticleStatus('empty'))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при получении списка глав.')
			)
		}
	},
}

export default articleService
