import { articleRequests } from '../requests/articleRequests'

const articleService = {
	/** Функция запрашивает с сервера список статей */
	async reqArticles() {
		try {
			const response = await articleRequests.getAll()

			if (response.status === 'success') {
				return response.data.articles
			}
		}
		catch(err) {
			console.error('Возникла ошибка при получении списка глав.')
		}
		finally {
			return null
		}
	},

	/**
	 * Переводит массив статей полученный с сервера в формат данных
	 * для отрисовки компонентом IndexList.
	 * @param {Array} articlesList — список статей присланный с сервера
	 */
	/*artsListDataFromServerToIndexListData(
		articlesList: Types.Entity.Article.ListItem[]
	): IndexListItemType[] {
		return  articlesList.map(article => {
			return {
				id: article.id,
				name: article.name,
				payAtn: article.payAtn || false,
				published: article.published,
				selected: false,
				order: article.order
			}
		})
	},*/
}

export default articleService
