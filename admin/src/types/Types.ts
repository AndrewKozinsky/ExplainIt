import ArticleRespType from '../../../api/src/modules/article/response/responseTypes'
import UpdateArticleDto from '../../../api/src/modules/article/dto/updateArticle.dto'
import CreateArticleDto from '../../../api/src/modules/article/dto/createArticle.dto'

namespace Types {
	// Ответы от сервера
	export namespace Req {
		// Сущность статьи
		export namespace Article {
			// Получение всех статей
			export type GetAll = ArticleRespType.GetAllWrap
			// Статья из списка всех статей
			export type ArticleListItem = ArticleRespType.ListItem

			// Получение статьи
			export type GetOne = ArticleRespType.GetOneWrap
			export type FullArticle = ArticleRespType.GetOne

			// Создание статьи
			export type CreateOne = ArticleRespType.CreateOneWrap
			// DTO для создания статьи
			export type CreateOneDto = CreateArticleDto


			// Обновление статьи
			export type UpdateOne = ArticleRespType.UpdateOneWrap
			// DTO для обновления статьи
			export type UpdateOneDto = UpdateArticleDto

			// Удаление статьи
			export type DeleteOne = ArticleRespType.DeleteOneWrap
		}
	}
}

export default Types
