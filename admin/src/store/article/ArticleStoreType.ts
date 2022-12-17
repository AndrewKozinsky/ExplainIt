import { PayloadAction } from '@reduxjs/toolkit'
import { IndexListItemType } from 'components/common/IndexList/IndexList'
import Types from '../../types/Types'


namespace ArticleStoreType {
	export type SelectedArticleId = null | number
	// Статус загрузки статьи: empty (статьи нет), pending (загрузка), downloaded (загружена)
	export type ArticleStatus = 'empty' | 'pending' | 'downloaded'

	// Состояние Хранилища
	export type State = {
		articles: IndexListItemType[]
		articleId: SelectedArticleId
		articleStatus: ArticleStatus
		article: null | Types.Req.Article.FullArticle
		needToLoadAllArticles: boolean
	}

	// Установка списка статей
	export type SetArticlesAction = PayloadAction<IndexListItemType[]>

	// Установка текущей статьи
	export type SetArticleAction = PayloadAction<Types.Req.Article.FullArticle>

	// Установка id выбранной статьи
	export type SetArticleId = PayloadAction<SelectedArticleId>

	export type SetArticleStatus = PayloadAction<ArticleStatus>

	// Изменение статуса необходимости скачивания списка всех статей
	export type SetLoadAllArticles = PayloadAction<boolean>

	// Изменение статуса необходимости скачивания списка всех статей
	export type InsertNewArticle = PayloadAction<IndexListItemType>

	// Удаление статьи
	export type DeleteArticle = PayloadAction<number>

	// Обновление свойств элемента массива articles
	export type UpdateArticleListItem = PayloadAction<{
		articleId: number
		newProps: Partial<IndexListItemType>
	}>

	// Передвижение элемента вверх/вниз в массиве articles
	export type ChangeOrderArticleListItem = PayloadAction<{
		articleId: number
		direction: 'up' | 'down'
	}>
}

export default ArticleStoreType

