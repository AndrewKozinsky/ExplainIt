import ArticleRespType from '../../../api/src/modules/article/response/responseTypes'
import UpdateArticleDto from '../../../api/src/modules/article/dto/updateArticle.dto'
import CreateArticleDto from '../../../api/src/modules/article/dto/createArticle.dto'
import CreateGroupDto from '../../../api/src/modules/proposalsGroup/dto/createGroup.dto'
import ProposalsGroupRespType from '../../../api/src/modules/proposalsGroup/response/responseTypes'
import ModelTypes from '../../../api/src/types/modelTypes'
import UpdateGroupDto from '../../../api/src/modules/proposalsGroup/dto/updateGroup.dto'

namespace Types {
	// Ответы от сервера
	export namespace Req {
		// Сущность статьи
		export namespace Article {
			// Получение всех статей
			export type GetAll = ArticleRespType.GetAllWrap

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

		// Сущность группы предложений
		export namespace ProposalGroup {
			// Создание группы предложений
			export type CreateOne = ProposalsGroupRespType.CreateOneWrap
			// DTO для создания группы предложений
			export type CreateOneDto = CreateGroupDto

			// Получение группы предложений
			// export type GetOne = ProposalsGroupRespType.GetOneWrap
			export type Group = ProposalsGroupRespType.GetOne

			// Обновление группы предложений
			export type UpdateOne = ProposalsGroupRespType.UpdateOneWrap
			// DTO для обновления группы предложений
			export type UpdateOneDto = UpdateGroupDto

			// Удаление группы предложений
			export type DeleteOne = ProposalsGroupRespType.DeleteOneWrap
		}
	}

	export namespace Entity {
		// Сущность статьи
		export namespace Article {
			// Статья из списка всех статей
			export type ListItem = ArticleRespType.ListItem
		}
		export namespace Group {
			// Типы групп
			export type GroupType = ModelTypes.ProposalGroup.GroupType
		}
	}
}

export default Types
