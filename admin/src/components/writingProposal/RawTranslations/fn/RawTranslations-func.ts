import { useCallback, useEffect, useState } from 'react'
import Types from 'types/Types'
import findService from 'services/find.service'
import useGetArticleSelectors from 'store/article/articleSelectors'
import writingProposalService from 'services/writingProposal.service'

/** Возвращает массив строк необработанных вариантов перевода */
export function useGetRows() {
	const { article, currentGroupId, currentGroupType, currentProposalId } = useGetArticleSelectors()

	const [rows, setRows] = useState<Types.Entity.WritingProposal.RowTranslate[]>([])

	useEffect(function () {
		if (!article || !currentGroupId || !currentGroupType || !currentProposalId) {
			return
		}

		const proposal = findService.findProposalInArticle(
			article, currentGroupId, currentGroupType, currentProposalId
		) as Types.Entity.WritingProposal.Item

		setRows(proposal.rawTranslations)
	}, [article])

	return rows
}

/**
 * Обработчик удаления необработанного предложения
 * @param {String} rowProposalText — текст удаляемого необработанного перевода из письменного предложения
 */
export function useGetDeleteRowProposal(rowProposalText: string) {
	const { currentProposalId } = useGetArticleSelectors()

	return useCallback(function () {
		if (!currentProposalId) return

		const confirmed = confirm('Вы уверены в удалении перевода предложения?')

		if (confirmed) {
			writingProposalService.removeRawTranslation(currentProposalId, rowProposalText)
		}
	}, [currentProposalId])
}
