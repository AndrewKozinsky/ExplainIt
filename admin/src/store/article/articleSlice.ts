import { createSlice } from '@reduxjs/toolkit'
import ArticleStoreType from 'store/article/ArticleStoreType'
import proposalService from 'services/proposal'
import proposalGroupService from 'services/proposalGroup'
import proposal from 'services/proposal'
import group from 'components/groups/Group/Group'

const initialState: ArticleStoreType.State = {
	articles: [],            // Массив всех статей
	needToLoadAllArticles: true,    // Нужно ли загрузить массив статей. После загрузки статус становится в false.
	articleId: null, // id выбранной статьи
	articleStatus: 'empty', // статус загрузки статьи
	article: null, // Текущая статья
	currentGroupId: null, // id выделенной группы упражнений
	currentGroupType: null, // тип выделенной группы
	currentProposalId: null, // id выделенного предложения
}

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {
		setArticles(state, action: ArticleStoreType.SetArticlesAction) {
			state.articles = action.payload
		},
		// Установка id активной статьи
		setArticleId(state, action: ArticleStoreType.SetArticleId) {
			state.articleId = action.payload
		},
		// Установка статуса загрузки статьи
		setArticleStatus(state, action: ArticleStoreType.SetArticleStatus) {
			state.articleStatus = action.payload
		},
		// Установка текущей статьи
		setArticle(state, action: ArticleStoreType.SetArticleAction) {
			state.article = action.payload
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
		setGroup(state, action: ArticleStoreType.SetGroup) {
			state.currentGroupId = action.payload.groupId
			state.currentGroupType = action.payload.groupType
		},
		// Перемещение элемента массива articles вверх или вниз
		changeOrderGroupListItem(state, action: ArticleStoreType.ChangeOrderGroupListItem) {
			if (!state.article) return

			const groups = state.article.proposalsGroups

			const idx = groups.findIndex(art => {
				return art.id === action.payload.groupId
			})
			if (idx === -1) return state

			const group = groups[idx]
			console.log(group)

			if (action.payload.direction === 'up') {
				groups.splice(idx, 1)
				groups.splice(idx - 1, 0, group)
			}
			else if (action.payload.direction === 'down') {
				groups.splice(idx, 1)
				groups.splice(idx + 1, 0, group)
			}
		},
		// Обновление свойств элемента массива групп
		updateGroupListItem(state, action: ArticleStoreType.UpdateGroupListItem) {
			const { article } = state
			if (!article) return state

			const group = article.proposalsGroups.find(group => {
				return group.id == action.payload.groupId
			})
			if (!group) return state

			for (let key in action.payload.newProps) {
				// @ts-ignore
				group[key] = action.payload.newProps[key]
			}
		},
		deleteGroup(state, action: ArticleStoreType.DeleteGroup) {
			const { article } = state
			if (!article) return state

			article.proposalsGroups = article.proposalsGroups.filter(group => {
				return group.id !== action.payload
			})
		},
		// Установка id активной статьи
		setProposalId(state, action: ArticleStoreType.SetProposalId) {
			state.currentProposalId = action.payload
		},
		deleteProposal(state, action: ArticleStoreType.DeleteProposal) {
			const { article } = state
			if (!article) return state

			const group = proposalGroupService.findById(article, action.payload.groupId)
			if (!group) return

			if (group.type === 'oral') {
				group.oralProposals = group.oralProposals.filter(proposal => {
					return proposal.id !== action.payload.proposalId
				})
			}
		},
		// Обновление свойств элемента массива групп
		updateProposalListItem(state, action: ArticleStoreType.UpdateProposalListItem) {
			const { article } = state
			if (!article) return state

			const group = proposalGroupService.findById(article,action.payload.groupId)
			if (!group) return

			const proposal = proposalService.findByIdInGroup(group, group.type, action.payload.proposalId)
			if (!proposal) return

			for (let key in action.payload.newProps) {
				// @ts-ignore
				proposal[key] = action.payload.newProps[key]
			}
		},
	}
})

export default articleSlice
