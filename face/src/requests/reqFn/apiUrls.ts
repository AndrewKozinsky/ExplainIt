// Адреса методов сервера
export const addresses = {
	// СТАТЬИ
	articles: '/api/articles',
	article(artId: number | string): string {
		return '/api/articles/' + artId
	},

	// ГРУППЫ ПРЕДЛОЖЕНИЙ
	// groups: '/api/proposalsGroup',
	/*group(groupId: number | string): string {
		return '/api/proposalsGroup/' + groupId
	},*/

	// ГОЛОСОВОЕ ПРЕДЛОЖЕНИЕ
	// oralProposals: '/api/oralProposal',
	/*oralProposal(proposalId: number | string): string {
		return '/api/oralProposal/' + proposalId
	},*/

	// ПИСЬМЕННОЕ ПРЕДЛОЖЕНИЕ
	// writingProposals: '/api/writingProposal',
	/*writingProposal(proposalId: number | string): string {
		return '/api/writingProposal/' + proposalId
	},*/
	/*writingProposalRawTranslate(proposalId: number | string): string {
		return '/api/writingProposal/' + proposalId + '/rawProposal'
	},*/

	// ПЕРЕВОД ПИСЬМЕННОГО ПРЕДЛОЖЕНИЯ
	// translates: '/api/translate',
	/*translate(translateId: number | string): string {
		return '/api/translate/' + translateId
	},*/

	// СЛОВО
	// words: '/api/word',
	/*word(wordId: number | string): string {
		return '/api/word/' + wordId
	},*/
}
