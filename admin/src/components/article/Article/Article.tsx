import React from 'react'
import ContentWrapper from 'components/common/ContentWrapper/ContentWrapper'
import { useSetArticleInStore } from 'components/article/Article/Article-func'
import ArticleForm from '../ArticleForm/ArticleForm'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Groups from '../../groups/Groups/Groups'

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
			<Groups />
		</ContentWrapper>
	)
}

export default Article
