
export const addresses = {
	// СТАТЬИ
	articles: 'articles',
	article: function (artId: number): string {
		return 'articles/' + artId
	}
}

export type APIAddressesType = keyof typeof addresses

/**
 * Оборачивание объекта addresses чтобы при запросе к началу каждого адреса добавлялась приставка /api/.
 * @param {String} urlKey — ключ адреса
 * @param {Array} args — аргументы передаваемые в функцию
 */
function getApiUrl(urlKey: APIAddressesType, ...args: any[]): string {
	const value = addresses[urlKey]

	return typeof value === 'string'
		? '/api/' + value
		// @ts-ignore
		: '/api/' + value(...args)
}

export default getApiUrl

