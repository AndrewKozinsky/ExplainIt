// Адреса методов сервера
export const addresses = {
	// СТАТЬИ
	articles: '/api/articles',
	article(artId: number | string): string {
		return '/api/articles/' + artId
	},

	// ГРУППЫ УПРАЖНЕНИЙ
	groups: '/api/proposalsGroup',
	group(groupId: number | string): string {
		return '/api/proposalsGroup/' + groupId
	}
}
