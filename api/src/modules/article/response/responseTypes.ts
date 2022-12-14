import { Article } from '../model/article.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами статьи */
namespace ArticleRespType {
	// Получение всех статей
	export type GetAll = ListItem[]
	export type GetAllSuccessWrap = GeneralRespType.Success<Payload<GetAll>>
	export type GetAllFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type GetAllWrap = GetAllSuccessWrap | GetAllFailWrap

	// Получение статьи
	export type GetOne = Article
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание статьи
	export type CreateOne = Article
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap

	// Обновление статьи
	export type UpdateOne = Article
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление статьи
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	// Статья с сокращённым набором данных
	export type ListItem = Pick<Article, 'id' | 'name' | 'published' | 'order' | 'payAtn'>

	type Payload<T> = { articles: T }
}

export default ArticleRespType
