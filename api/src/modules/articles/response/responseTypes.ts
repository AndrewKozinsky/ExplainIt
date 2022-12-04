import { Article } from '../model/article.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами статьи */
export namespace ArticleRespType {
	// Получение всех статей
	export type GetAll = ListItem[]
	export type GetAllWrap = GeneralRespType.Success<Payload<GetAll>>

	// Получение статьи
	export type GetOne = Article
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание статьи
	export type CreateOne = Article
	export type CreateOneWrap = GeneralRespType.Success<Payload<CreateOne>>

	// Обновление статьи
	export type UpdateOne = Article
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление статьи
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	// Статья с сокращённым набором данных
	type ListItem = Pick<Article, 'id' | 'name' | 'published' | 'order'>

	type Payload<T> = { articles: T }
}
