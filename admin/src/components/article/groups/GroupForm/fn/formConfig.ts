// import { useEffect, useState } from 'react'
// import MFTypes from 'utils/modernForm/lib/MFTypes'
// import Types from 'types/Types'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import { proposalGroupRequests } from 'requests/proposalGroupRequests'
// import findService from 'services/find.service'

/**
 * Возвращает объект конфигурации формы редактирования группы упражнений
 * @param {Number} groupId — id группы предложений
 */
/*export function useGetFormConfig(groupId: number) {
	const { article } = useGetArticleSelectors()

	const [formConfig, setFormConfig] = useState<MFTypes.Config>(
		getFormConfig(article as Types.Req.Article.FullArticle, groupId as number)
	)

	useEffect(function () {
		if (!article || !groupId) {
			return
		}

		const formConfig = getFormConfig(article, groupId)
		setFormConfig(formConfig)
	}, [groupId])

	return formConfig
}*/

/**
 * Формирует и возвращает объект конфигурации формы редактирования группы предложений
 * @param {Object} article — объект статьи
 * @param {Number} groupId — id группы предложений
 */
/*export function getFormConfig(article: Types.Req.Article.FullArticle, groupId: number): MFTypes.Config {
	const groupObj = findService.findGroupInArticle(article, groupId)

	return {
		fields: {
			type: {
				fieldType: 'select',
				initialCheckedValue: groupObj?.type,
				options: [
					{ value: 'oral', label: 'Устное' },
					{ value: 'writing', label: 'Письменное' }
				]
			},
		},
		async requestFn(readyFieldValues) {
			return updateGroupRequest(groupId, readyFieldValues as FormValuesType)
		},
		settings: {
			sendFormOnFieldChange: true
		},
	}
}*/

/*type FormValuesType = {
	type: Types.Entity.Group.GroupType
}*/

/**
 * Обработчик отправки формы
 * @param groupId
 * @param formValues
 */
/*async function updateGroupRequest(
	groupId: number, formValues: FormValuesType
): Promise<MFTypes.RequestFnReturn> {
	const dto: Types.Req.ProposalGroup.UpdateOneDto = {
		type: formValues.type
	}
	const response = await proposalGroupRequests.updateOne(groupId, dto)

	if (response.status == 'success') {
		return { status: 'success' }
	}
	else {
		return {
			status: 'fail',
			commonError: response.message,
		}
	}
}*/
export {}
