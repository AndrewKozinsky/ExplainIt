// import React from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import {
// 	deleteProposal,
// } from './Proposals-func'
// import IndexList from '../../common/IndexList/IndexList'
// import { useGetProposalsList } from './Proposals-func'
// import proposalService from 'services/proposal.service'

/** Список предложений */
/*function Proposals() {
	const { currentGroupId, currentProposalId } = useGetArticleSelectors()

	const proposalsList = useGetProposalsList()

	if (!currentGroupId) {
		return null
	}

	return (
		<IndexList
			items={proposalsList}
			selectedItemId={currentProposalId}
			onClickHandler={proposalService.select}
			onDeleteItem={deleteProposal}
			onChangeItemOrder={proposalService.changeOrder.bind(proposalService)}
		/>
	)
}*/

// export default Proposals
export {}
