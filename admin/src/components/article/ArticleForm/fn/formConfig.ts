import { getEmptyFormConfig } from 'utils/miscUtils'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import Types from '../../../../types/Types'
import { articleRequests } from 'requests/articles/articleRequests'
import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'

export function useGetFormConfig() {
	const { article, articleStatus } = useGetArticleSelectors()

	const [formConfig, setFormConfig] = useState<MFTypes.Config>(
		getFormConfig(article as Types.Req.Article.FullArticle)
	)

	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(function () {
		if (articleStatus !== 'downloaded' || !article || isFirstRender) {
			setIsFirstRender(false)
			return
		}

		const formConfig = getFormConfig(article)
		setFormConfig(formConfig)
	}, [articleStatus])

	return formConfig
}

function getFormConfig(article: Types.Req.Article.FullArticle): MFTypes.Config {
	return {
		fields: {
			name: {
				fieldType: 'text',
				initialValue: article.name,
				schema(fields, value) {
					return null
				}
			},
			chapter: {
				fieldType: 'text',
				initialValue: article.chapter,
			},
			published: {
				fieldType: 'toggle',
				value: 'published',
				initialChecked: article.published
			},
			summary: {
				fieldType: 'text',
				initialValue: article.summary,
			},
			content: {
				fieldType: 'text',
				initialValue: article.content,
			}
		},
		async requestFn(readyFieldValues) {
			return updateArticleRequest(article.id, readyFieldValues as FormValuesType)
		},
		settings: {/*...*/},
	}
}

type FormValuesType = {
	chapter: string
	content: string
	name: string
	published: boolean
	summary: string
}

async function updateArticleRequest(articleId: number, formValues: FormValuesType): Promise<MFTypes.RequestFnReturn> {
	const dto: Types.Req.Article.UpdateOneDto = {
		name: formValues.name,
		chapter: formValues.chapter,
		published: formValues.published,
		summary: formValues.summary,
		content: formValues.content
	}
	const response = await articleRequests.updateOne(articleId, dto)

	if (response.status == 'success') {
		return { status: 'success' }
	}
	else if (response.status == 'fail') {
		const fieldsErrors: { name: string, message: string }[] = []

		if (response.fieldsErrors) {
			for(let key in response.fieldsErrors) {
				fieldsErrors.push({
					name: key,
					message: response.fieldsErrors[key][0]
				})
			}
		}

		return {
			status: 'fail',
			commonError: response.message,
			fieldsErrors
		}
	}
	else {
		return {
			status: 'fail',
			commonError: response.message,
		}
	}
}
