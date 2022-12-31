import { useEffect, useState } from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import proposalService from 'services/proposal.service'
import proposalGroupService from 'services/proposalGroup.service'
import Types from 'types/Types'
import store from 'store/store'
import { IndexListItemType } from '../../common/IndexList/IndexList'

/** Формирует и возвращает данные для построения списка предложений выделенной гурппы предложений */
export function useGetProposalsList() {
	const { article, currentGroupId, currentProposalId } = useGetArticleSelectors()
	const [proposalsList, setProposalsList] = useState<IndexListItemType[]>([])

	useEffect(() => {
		if (!article || !currentGroupId) return

		const currentGroup = proposalGroupService.getSelectedGroup()
		if (!currentGroup) return

		let proposals: Types.Entity.OralProposal.Item[] | Types.Entity.WritingProposal.Item[] = []
		if (currentGroup.type == 'oral') {
			proposals = currentGroup.oralProposals
		}
		else if (currentGroup.type == 'writing') {
			proposals = currentGroup.writingProposals
		}

		const list = proposalService.proposalsListDataFromServerToIndexListData(proposals)
		setProposalsList(list)
	}, [article, currentGroupId, currentProposalId])

	return proposalsList
}

/**
 * Функция удаления предложения
 * @param {Number} proposalId — id удаляемого предложения
 */
export function deleteProposal(proposalId: number) {
	const confirmed = confirm('Вы уверены в удалении предложения')

	if (confirmed) {
		const { currentGroupType } = store.getState().article
		if (!currentGroupType) return

		proposalService.delete(proposalId, currentGroupType)
	}
}
