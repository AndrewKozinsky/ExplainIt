import ArticleRespType from '../../../api/src/modules/article/response/responseTypes'
import UpdateArticleDto from '../../../api/src/modules/article/dto/updateArticle.dto'

namespace Types {
	// Ответы от сервера
	export namespace Req {
		// Сущность статьи
		export namespace Article {
			// Получение всех статей
			export type GetAll = ArticleRespType.GetAllWrap
			// Статья из списка всех статей
			export type ArticleListItem = ArticleRespType.ListItem

			// Обновление статьи
			export type UpdateOne = ArticleRespType.GetAllWrap
			// DTO для обновления статьи
			export type UpdateOneDto = UpdateArticleDto

			// Удаление статьи
			export type DeleteOne = ArticleRespType.DeleteOneWrap
		}
	}
}

export default Types
