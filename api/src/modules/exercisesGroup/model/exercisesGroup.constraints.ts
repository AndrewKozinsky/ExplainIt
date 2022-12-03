const exercisesGroupConstraints = {
	id: {

	},
	article_id: {
		min: -32768,
		max: 32767
	},
	type: {
		maxLength: 255
	},
	order: {
		min: -32768,
		max: 32767
	}
}

export default exercisesGroupConstraints
