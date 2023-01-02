import { useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Types from 'types/Types'
import findService from 'services/find.service'

export type BadTranslationType = {
	id: number
	text: string // Текст неподходящего предложения
}

export function useGetState() {
	const { article, currentGroupId, currentGroupType, currentProposalId } = useGetArticleSelectors()

	const [state, setState] = useState<BadTranslationType[]>(
		createState(article, currentGroupId, currentGroupType, currentProposalId)
	)

	return {
		state,
		setState
	}
}

function createState(
	article: null | Types.Req.Article.FullArticle,
	currentGroupId: null | number,
	currentGroupType: Types.Entity.Group.GroupType | null,
	currentProposalId: null | number
): BadTranslationType[] {
	if (!article || !currentGroupId || !currentGroupType || !currentProposalId) {
		return []
	}

	const proposal = findService.findProposalInArticle(
		article, currentGroupId, currentGroupType, currentProposalId
	) as Types.Entity.WritingProposal.Item

	return proposal.badTranslations.map(createStateBlockItemFromTranslation)
}

/**
 * Функция получает объект перевода из предложения статьи
 * и возвращает объект перевода требуемый для формата местного Состояния
 * для показа неправильных переводов письменного предложения.
 * @param {String} translationText — текст перевода
 * @param {Number} id — id перевода
 */
export function createStateBlockItemFromTranslation(
	translationText: string, id: number
): BadTranslationType {
	return {
		id,
		text: translationText
	}
}
