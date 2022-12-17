import React, { ReactElement } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import {
	deleteArticle,
	useRequestArticles,
	useRestoreAppState
} from './Articles-func'
import { ContentLoading } from '../../common/Loading/Loading'
import IndexList from '../../common/IndexList/IndexList'
import articleService from '../../../services/article'

/** Список статей */
function Articles() {
	// Запрос списка статей и помещение в Хранилище при изменении свойства needToLoadAllArticles в Хранилище
	useRequestArticles()

	// При загрузке страницы восстановить значения Хранилища
	useRestoreAppState()

	// Список статей
	const { articles, articleId, needToLoadAllArticles } = useGetArticleSelectors()

	return (
		<ContentLoading loading={needToLoadAllArticles}>
			<IndexList
				items={articles}
				selectedItemId={articleId}
				onClickHandler={articleService.select}
				onDeleteItem={deleteArticle}
				onChangeItemOrder={articleService.changeOrder.bind(articleService)}
			/>
		</ContentLoading>
	)
}

export default Articles
