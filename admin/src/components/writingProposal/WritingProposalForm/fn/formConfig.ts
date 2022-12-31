import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import Types from 'types/Types'
import proposalService from 'services/proposal.service'
import proposalGroupService from 'services/proposalGroup.service'
import writingProposalRequests from 'requests/writingProposalRequests'
import articleService from 'services/article.service'
import findService from 'services/find.service'

/** Хук возвращает объект конфигурации формы редактирования голосового предложения.
 * Этот объект пересобирается после получения другого предложения. */
export function useGetFormConfig() {
	const { article, currentGroupId, currentGroupType, currentProposalId } = useGetArticleSelectors()

	const [formConfig, setFormConfig] = useState<MFTypes.Config>(
		getFormConfig(
			article as Types.Req.Article.FullArticle,
			currentGroupId as number,
			currentGroupType as Types.Entity.Group.GroupType,
			currentProposalId as number
		)
	)

	useEffect(function () {
		if (!currentProposalId) {
			return
		}

		const formConfig = getFormConfig(
			article as Types.Req.Article.FullArticle,
			currentGroupId as number,
			currentGroupType as Types.Entity.Group.GroupType,
			currentProposalId as number
		)
		setFormConfig(formConfig)
	}, [currentProposalId])

	return formConfig
}

/**
 * Функция возвращает объект конфигурации формы редактирования предложения
 * @param {Object} article — объект статьи
 * @param {Number} groupId — id группы предложений
 * @param {String} proposalType — тип предложения (голосовое или письменное)
 * @param {Number} proposalId — id текущего предложения
 */
function getFormConfig(
	article: Types.Req.Article.FullArticle,
	groupId: number,
	proposalType: Types.Entity.Group.GroupType,
	proposalId: number
//@ts-ignore
): MFTypes.Config {
	const group = findService.findGroupInArticle(article, groupId) as Types.Req.ProposalGroup.Group
	const proposal = findService.findProposalInGroup(
		group, proposalType, proposalId
	) as Types.Entity.WritingProposal.Item

	return {
		fields: {
			rusProposal: {
				fieldType: 'text',
				initialValue: proposal.rusProposal,
			},
			note: {
				fieldType: 'text',
				initialValue: proposal.note,
			},
			published: {
				fieldType: 'toggle',
				value: 'published',
				initialChecked: proposal.published
			},
		},
		async requestFn(readyFieldValues) {
			return updateProposalRequest(proposal.id, readyFieldValues as FormValuesType)
		}
	}
}

type FormValuesType = {
	rusProposal: string
	note: string
	engProposal: string
	published: boolean
}

/**
 * Обработчик отправки формы
 * @param {Number} proposalId — id текущего предложения
 * @param {Object} formValues — объект с введёнными в форму редактирования предложения значениями
 */
async function updateProposalRequest(
	proposalId: number, formValues: FormValuesType
): Promise<MFTypes.RequestFnReturn> {
	const dto: Types.Req.WritingProposal.UpdateOneDto = {
		rusProposal: formValues.rusProposal,
		note: formValues.note,
		published: formValues.published,
	}
	const response = await writingProposalRequests.updateOne(proposalId, dto)

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
