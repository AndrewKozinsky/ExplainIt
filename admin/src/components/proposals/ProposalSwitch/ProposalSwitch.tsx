import React from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import OralProposal from '../../oralProposal/OralProposal/OralProposal'
import WritingProposal from '../../writingProposal/WritingProposal/WritingProposal'

// Переключатель между разными типами упражнений
function ProposalSwitch() {
	const { article, currentGroupType, currentProposalId } = useGetArticleSelectors()

	if (!article || !currentGroupType || !currentProposalId) return null

	return currentGroupType == 'oral' ? <OralProposal /> : <WritingProposal />
}

export default ProposalSwitch
