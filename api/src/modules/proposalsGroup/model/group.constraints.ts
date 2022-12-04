const groupConstraints = {
	id: {

	},
	articleId: {
		min: -32768,
		max: 32767
	},
	type: {
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

export default groupConstraints
