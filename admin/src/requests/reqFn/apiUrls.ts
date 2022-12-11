
export const addresses = {
	// СТАТЬИ
	articles: '/api/articles',
	article(artId: number): string {
		return '/api/articles/' + artId
	}
}

