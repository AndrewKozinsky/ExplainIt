import { PayloadAction } from '@reduxjs/toolkit'
import { IndexListItemType } from 'components/common/IndexList/IndexList'


namespace ArticleStoreType {
	export type SelectedArticleId = null | number

	// Состояние Хранилища
	export type State = {
		selectedArticleId: SelectedArticleId
		articles: IndexListItemType[]
		needToLoadAllArticles: boolean
	}

	// Установка списка статей
	export type SetArticlesAction = PayloadAction<IndexListItemType[]>

	// Установка id выбранной статьи
	export type SetSelectedArticleId = PayloadAction<SelectedArticleId>

	// Изменение статуса необходимости скачивания списка всех статей
	export type SetLoadAllArticles = PayloadAction<boolean>

	// Изменение статуса необходимости скачивания списка всех статей
	// export type InsertNewArticle = PayloadAction<IndexListItemType>

	// Удаление статьи
	export type DeleteArticle = PayloadAction<number>

	// Обновление свойств элемента массива articles
	/*export type UpdateArticleListItem = PayloadAction<{
		articleId: number
		newProps: Partial<IndexListItemType>
	}>*/

	// Передвижение элемента вверх/вниз в массиве articles
	export type ChangeOrderArticleListItem = PayloadAction<{
		articleId: number
		direction: 'up' | 'down'
	}>
}

export default ArticleStoreType

