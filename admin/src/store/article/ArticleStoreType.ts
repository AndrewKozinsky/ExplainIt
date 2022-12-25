import { PayloadAction } from '@reduxjs/toolkit'
import { IndexListItemType } from 'components/common/IndexList/IndexList'
import Types from '../../types/Types'

namespace ArticleStoreType {
	export type SelectedItemId = null | number
	// Статус загрузки статьи: empty (статьи нет), pending (загрузка), downloaded (загружена)
	export type ArticleStatus = 'empty' | 'pending' | 'downloaded'

	// Состояние Хранилища
	export type State = {
		articles: IndexListItemType[]
		needToLoadAllArticles: boolean
		articleId: SelectedItemId
		articleStatus: ArticleStatus
		article: null | Types.Req.Article.FullArticle
		currentGroupId: SelectedItemId
		currentProposalId: SelectedItemId
	}

	// Установка списка статей
	export type SetArticlesAction = PayloadAction<IndexListItemType[]>

	// Установка текущей статьи
	export type SetArticleAction = PayloadAction<Types.Req.Article.FullArticle>

	// Установка id выбранной статьи
	export type SetArticleId = PayloadAction<SelectedItemId>

	// Установка статуса загрузки статьи
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

	// Установка id выбранной группы упражнений
	export type SetGroupId = PayloadAction<SelectedItemId>

	// Передвижение элемента вверх/вниз в массиве articles
	export type ChangeOrderGroupListItem = PayloadAction<{
		groupId: number
		direction: 'up' | 'down'
	}>

	// Обновление свойств элемента массива groups в статье
	export type UpdateGroupListItem = PayloadAction<{
		groupId: number
		newProps: Types.Req.ProposalGroup.UpdateOneDto
	}>

	// Удаление группы предложений
	export type DeleteGroup = PayloadAction<number>
}

export default ArticleStoreType
