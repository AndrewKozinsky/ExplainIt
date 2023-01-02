import { GeneralRespType } from '../../../types/generalResponse'
import Word from '../model/word.model'

/** Типы данных возвращаемыми методами статьи */
namespace WordRespType {
	// Получение слова
	export type GetOne = Word
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание слова
	export type CreateOne = Word
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap


	// Обновление слова
	export type UpdateOne = Word
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление слова
	export type Delete = true
	export type DeleteSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type DeleteWrap = DeleteSuccessWrap | DeleteFailWrap

	// ====================================

	type Payload<T> = { words: T }
}

export default WordRespType
