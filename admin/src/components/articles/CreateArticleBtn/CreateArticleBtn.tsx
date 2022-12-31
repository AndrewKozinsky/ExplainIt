import React from 'react'
import Button from '../../formElements/Button/Button'
import { useIsDisabled } from './CreateArticleBtn-func'
import articleService from 'services/article.service'

// Кнопка создающая пустую новую статью
function CreateArticleBtn() {
	const isDisabled = useIsDisabled()

	return (
		<Button
			text='Добавить'
			block
			onClick={articleService.createArticle.bind(articleService)}
			disabled={isDisabled}
		/>
	)
}

export default CreateArticleBtn
