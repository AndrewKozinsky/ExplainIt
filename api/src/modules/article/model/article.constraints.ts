const articleConstraints = {
	id: {

	},
	name: {
		minLength: 3,
		maxLength: 255
	},
	chapter: {
		maxLength: 255
	},
	published: {

	},
	summary: {
		maxLength: 255
	},
	content: {

	},
	order: {
		min: -32768,
		max: 32767
	}
}

export default articleConstraints
