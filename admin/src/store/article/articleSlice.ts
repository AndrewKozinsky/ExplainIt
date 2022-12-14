import { createSlice } from '@reduxjs/toolkit'
import ArticleStoreType from 'store/article/ArticleStoreType'


const initialState: ArticleStoreType.State = {
	selectedArticleId: null, // id выбранной статьи
	articles: [],            // Массив всех статей
	article: null,           // Текущая статья
	needToLoadAllArticles: true    // Нужно ли загрузить массив статей. После загрузки статус становится в false.
}

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		setArticles(state, action: ArticleStoreType.SetArticlesAction) {
			state.articles = action.payload
		},
		setArticle(state, action: ArticleStoreType.SetArticleAction) {
			state.article = action.payload
		},
		setSelectedArticleId(state, action: ArticleStoreType.SetSelectedArticleId) {
			state.selectedArticleId = action.payload
		},
		setNeedToLoadAllArticles(state, action: ArticleStoreType.SetLoadAllArticles) {
			state.needToLoadAllArticles = action.payload
		},
		insertNewArticle(state, action: ArticleStoreType.InsertNewArticle) {
			state.articles.push(action.payload)
		},
		deleteArticle(state, action: ArticleStoreType.DeleteArticle) {
			if (!state.articles) return

			state.articles = state.articles.filter(art => art.id !== action.payload)
		},
		// Обновление свойств элемента массива articles
		updateArticleListItem(state, action: ArticleStoreType.UpdateArticleListItem) {
			if (!state.articles) return state

			const articleIdx = state.articles.findIndex(art => art.id === action.payload.articleId)

			state.articles[articleIdx] = { ...state.articles[articleIdx], ...action.payload.newProps }
		},
		// Перемещение элемента массива articles вверх или вниз
		changeOrderArticleListItem(state, action: ArticleStoreType.ChangeOrderArticleListItem) {
			if (!state.articles) return state

			const idx = state.articles.findIndex(art => {
				return art.id === action.payload.articleId
			})
			if (idx === -1) return state

			const article = state.articles[idx]

			if (action.payload.direction === 'up' && idx > 0) {
				state.articles.splice(idx, 1)
				state.articles.splice(idx - 1, 0, article)
			}
			else if (action.payload.direction === 'down' && idx < state.articles.length -1) {
				state.articles.splice(idx, 1)
				state.articles.splice(idx + 1, 0, article)
			}
		},
	}
})

export default articleSlice
