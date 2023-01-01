import React from 'react'
import ContentWrapper from '../../common/Blocks/ContentWrapper/ContentWrapper'
import WritingProposalForm from '../WritingProposalForm/WritingProposalForm'
import RawTranslations from '../RawTranslations/RawTranslations'
import Translations from '../translations/Translations/Translations'

function WritingProposal() {
	return (
		<ContentWrapper>
			<WritingProposalForm />
			<RawTranslations />
			<Translations />
		</ContentWrapper>
	)
}

export default WritingProposal
