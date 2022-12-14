import React from 'react'
import ContentWrapper from 'components/common/ContentWrapper/ContentWrapper'
import { useSetArticleInStore } from 'components/article/Article/Article-func'
import ArticleForm from '../ArticleForm/ArticleForm'
import useGetArticleSelectors from 'store/article/articleSelectors'

function Article() {
	useSetArticleInStore()
	const { article } = useGetArticleSelectors()

	if (!article) {
		return null
	}

	return (
		<ContentWrapper>
			<ArticleForm />
		</ContentWrapper>
	)
}

export default Article
