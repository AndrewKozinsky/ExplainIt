import { useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Types from 'types/Types'
import findService from 'services/find.service'

export namespace State {
	export type TranslationsState = {
		blocks: Block[]
	}

	export type Block = {
		id: number
		engProposals: EngProposal[] // Варианты перевода русского предложения
		analysis: string // Текст разбора предложения
		isCorrect: boolean // Варианты перевода правильные?
		isChecked: boolean // Варианты перевода проверены?
	}

	export type EngProposal = {
		id: number
		proposal: string
	}
}

export function useGetState() {
	const { article, currentGroupId, currentGroupType, currentProposalId } = useGetArticleSelectors()

	const [state, setState] = useState<State.TranslationsState>(
		createTranslationsState(article, currentGroupId, currentGroupType, currentProposalId)
	)

	return {
		state,
		setState
	}
}

export const emptyState: State.TranslationsState = {
	blocks: []
}

function createTranslationsState(
	article: null | Types.Req.Article.FullArticle,
	currentGroupId: null | number,
	currentGroupType: Types.Entity.Group.GroupType | null,
	currentProposalId: null | number
): State.TranslationsState {
	if (!article || !currentGroupId || !currentGroupType || !currentProposalId) {
		return emptyState
	}

	const proposal = findService.findProposalInArticle(
		article, currentGroupId, currentGroupType, currentProposalId
	) as Types.Entity.WritingProposal.Item

	return {
		blocks: proposal.translates.map(block => {
			return createStateBlockItemFromTranslation(block)
		})
	}
}

/**
 * Функция получает объект перевода из предложения статьи
 * и возвращает объект перевода требуемый для формата местного Состояния
 * для показа блоков переводов выбранного письменного предложения.
 * @param {Object} translateBlock — объект перевода из предложения статьи
 */
export function createStateBlockItemFromTranslation(
	translateBlock: Types.Entity.Translation.Item
): State.Block {
	return {
		id: translateBlock.id,
		engProposals: translateBlock.translations.map((proposal, i) => {
			return {
				id: i,
				proposal
			}
		}),
		analysis: translateBlock.analysis || '',
		isCorrect: translateBlock.correct || false,
		isChecked: translateBlock.checked || false
	}
}
