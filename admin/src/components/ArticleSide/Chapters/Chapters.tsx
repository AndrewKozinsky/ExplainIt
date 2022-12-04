// import React, { ReactElement } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import {
// 	useRequestArticles,
// 	deleteArticle,
// 	changeArticleOrder,
// 	onItemClick,
// 	useRestoreAppState
// } from './Chapters-func'
// import { ContentLoading } from '../../common/Loading/Loading'
// import IndexList from '../../common/IndexList/IndexList'

/** Список статей */
/*function Chapters(): ReactElement {
	// Запрос списка статей и помещение в Хранилище при изменении свойства needToLoadAllArticles в Хранилище
	useRequestArticles()

	// При загрузке страницы восстановить значения Хранилища
	useRestoreAppState()

	// Список статей
	const { articles, selectedArticleId, needToLoadAllArticles } = useGetArticleSelectors()

	return (
		<ContentLoading loading={needToLoadAllArticles}>
			<IndexList
				items={articles}
				selectedItemId={selectedArticleId}
				onClickHandler={onItemClick}
				onDeleteItem={deleteArticle}
				onChangeItemOrder={changeArticleOrder}
			/>
		</ContentLoading>
	)
}*/

// export default Chapters

export {}
