import React from 'react'
import ArticleForm from '../ArticleForm/ArticleForm'
import useGetArticleSelectors from 'store/article/articleSelectors'
// import Groups from '../groups/Groups/Groups'
import { useSetArticleInStore } from './Article-func'
import ContentWrapper from '../../common/Blocks/ContentWrapper/ContentWrapper'

// Форма редактирования статьи и групп
function Article() {
	useSetArticleInStore()
	const { article } = useGetArticleSelectors()

	if (!article) {
		return null
	}

	return (
		<ContentWrapper>
			<ArticleForm />
			{/*<Groups />*/}
		</ContentWrapper>
	)
}

export default Article
