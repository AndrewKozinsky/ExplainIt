import React from 'react'
import ContentWrapper from '../../common/Blocks/ContentWrapper/ContentWrapper'
import WritingProposalForm from '../WritingProposalForm/WritingProposalForm'
import RawTranslations from '../RawTranslations/RawTranslations'

function WritingProposal() {
	return (
		<ContentWrapper>
			<WritingProposalForm />
			<RawTranslations />
		</ContentWrapper>
	)
}

export default WritingProposal
