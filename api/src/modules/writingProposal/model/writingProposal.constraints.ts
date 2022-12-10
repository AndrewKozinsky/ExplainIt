const writingProposalConstraints = {
	rusProposal: {
		minLength: 3,
		maxLength: 255
	},
	note: {
		maxLength: 255
	},
	published: {

	},
	engProposal: {
		maxLength: 255
	},
	badTranslations: {
		maxLength: 255
	},
	rawTranslations: {
		maxLength: 255
	},
	order: {
		min: -32768,
		max: 32767
	},
	proposalsGroupId: {
		min: -32768,
		max: 32767
	}
}

export default writingProposalConstraints
