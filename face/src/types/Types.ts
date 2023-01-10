import ArticleRespType from '../../../api/src/modules/article/response/responseTypes'
import UpdateArticleDto from '../../../api/src/modules/article/dto/updateArticle.dto'
import CreateArticleDto from '../../../api/src/modules/article/dto/createArticle.dto'
import CreateGroupDto from '../../../api/src/modules/proposalsGroup/dto/createGroup.dto'
import ProposalsGroupRespType from '../../../api/src/modules/proposalsGroup/response/responseTypes'
import ModelTypes from '../../../api/src/types/modelTypes'
import UpdateGroupDto from '../../../api/src/modules/proposalsGroup/dto/updateGroup.dto'
import OralProposalRespType from '../../../api/src/modules/oralProposal/response/responseTypes'
import CreateOralProposalDto from '../../../api/src/modules/oralProposal/dto/createOralProposal.dto'
import WritingProposalRespType from '../../../api/src/modules/writingProposal/response/responseTypes'
import CreateWritingProposalDto from '../../../api/src/modules/writingProposal/dto/createWritingProposal.dto'
import OralProposalModel from '../../../api/src/modules/oralProposal/model/oralProposal.model'
import WritingProposalModel from '../../../api/src/modules/writingProposal/model/writingProposal.model'
import UpdateOralProposalDto from '../../../api/src/modules/oralProposal/dto/updateOralProposal.dto'
import UpdateWritingProposalDto from '../../../api/src/modules/writingProposal/dto/updateWritingProposal.dto'
import RawTranslateDto from '../../../api/src/modules/writingProposal/dto/rawTranslate.dto'
import TranslateModel from '../../../api/src/modules/translate/model/translate.model'
import UpdateTranslateDto from '../../../api/src/modules/translate/dto/updateTranslate.dto'
import CreateTranslateDto from '../../../api/src/modules/translate/dto/createTranslate.dto'
import TranslateRespType from '../../../api/src/modules/translate/response/responseTypes'
import WordModel from '../../../api/src/modules/word/model/word.model'
import WordRespType from '../../../api/src/modules/word/response/responseTypes'
import CreateWordDto from '../../../api/src/modules/word/dto/createWord.dto'
import UpdateWordDto from '../../../api/src/modules/word/dto/updateWord.dto'

namespace Types {
	// Ответы от сервера
	export namespace Req {
		// Сущность статьи
		export namespace Article {
			// Получение всех статей
			export type GetAll = ArticleRespType.GetAllWrap

			// Получение статьи
			// export type GetOne = ArticleRespType.GetOneWrap
			// export type FullArticle = ArticleRespType.GetOne

			// Создание статьи
			// export type CreateOne = ArticleRespType.CreateOneWrap
			// DTO для создания статьи
			// export type CreateOneDto = CreateArticleDto

			// Обновление статьи
			// export type UpdateOne = ArticleRespType.UpdateOneWrap
			// DTO для обновления статьи
			// export type UpdateOneDto = UpdateArticleDto

			// Удаление статьи
			// export type DeleteOne = ArticleRespType.DeleteOneWrap
		}

		// Сущность группы предложений
		/*export namespace ProposalGroup {
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
		}*/

		// Сущность голосового предложения
		/*export namespace OralProposal {
			// Создание предложения
			export type CreateOne = OralProposalRespType.CreateOneWrap
			// DTO для создания предложения
			export type CreateOneDto = CreateOralProposalDto

			// Обновление голосового предложения
			export type UpdateOne = OralProposalRespType.UpdateOneWrap
			// DTO для обновления голосового предложения
			export type UpdateOneDto = UpdateOralProposalDto

			// Удаление группы предложений
			export type DeleteOne = OralProposalRespType.DeleteWrap
		}*/

		// Сущность письменного предложения
		/*export namespace WritingProposal {
			// Создание письменного предложения
			export type CreateOne = WritingProposalRespType.CreateOneWrap
			// DTO для создания письменного предложения
			export type CreateOneDto = CreateWritingProposalDto

			// Обновление письменного предложения
			export type UpdateOne = WritingProposalRespType.UpdateOneWrap
			// DTO для обновления голосового предложения
			export type UpdateOneDto = UpdateWritingProposalDto

			// Удаление письменного предложения
			export type DeleteOne = WritingProposalRespType.DeleteWrap

			// DTO для добавления/удаления необработанного перевода письменного предложения
			export type RawTranslateDTO = RawTranslateDto
		}*/

		// Сущность перевода
		/*export namespace Translation {
			// Создание перевода
			export type CreateOne = TranslateRespType.CreateOneWrap
			// DTO для создания перевода
			export type CreateOneDto = CreateTranslateDto

			// Обновление перевода
			export type UpdateOne = TranslateRespType.UpdateOneWrap
			// DTO для обновления перевода
			export type UpdateOneDto = UpdateTranslateDto

			// Удаление перевода
			export type DeleteOne = TranslateRespType.DeleteWrap
		}*/

		// Сущность слова
		/*export namespace Word {
			// Создание слова
			export type CreateOne = WordRespType.CreateOneWrap
			// DTO для создания слова
			export type CreateOneDto = CreateWordDto

			// Обновление слова
			export type UpdateOne = WordRespType.UpdateOneWrap
			// DTO для обновления слова
			export type UpdateOneDto = UpdateWordDto

			// Удаление слова
			export type DeleteOne = WordRespType.DeleteWrap
		}*/
	}

	export namespace Entity {
		// Сущность статьи
		/*export namespace Article {
			// Статья из списка всех статей
			export type ListItem = ArticleRespType.ListItem
		}*/
		/*export namespace Group {
			// Типы групп
			export type GroupType = ModelTypes.ProposalGroup.GroupType
		}*/
		/*export namespace OralProposal {
			// Объект предложения
			export type Item = OralProposalModel
		}*/
		/*export namespace WritingProposal {
			// Объект предложения
			export type Item = WritingProposalModel

			// Неразобранный перевод
			export type RowTranslate = string
		}*/
		/*export namespace Translation {
			// Перевод русского предложения
			export type Item = TranslateModel
		}*/
		/*export namespace Word {
			// Перевод русского предложения
			export type Item = WordModel
		}*/
	}
}

export default Types
