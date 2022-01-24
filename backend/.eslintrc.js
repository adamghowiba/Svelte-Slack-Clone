module.exports = {
	env: {
		node: true,
		es2021: true
	},
	parserOptions: {
		sourceType: 'module',
		project: ['./tsconfig.json']
	},
	settings: {
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true
			}
		}
	},
	ignorePatterns: ['.eslintrc.js'],
	extends: [
		'airbnb-base',
		'prettier',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'import/no-unresolved': 'off',
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never'
			}
		]
	}
};
