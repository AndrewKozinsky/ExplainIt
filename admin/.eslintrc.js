module.exports = {
	env: {
		es2021: true,
		node: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		'object-curly-spacing': ['warn', 'always'],
		quotes: ['warn', 'single'],
		semi: ['warn', 'never'],
		'max-len': ['warn', { code: 100, tabWidth: 1 }]
	}
}
