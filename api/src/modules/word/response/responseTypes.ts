import { GeneralRespType } from '../../../types/generalResponse'
import { Word } from '../model/word.model'

/** Типы данных возвращаемыми методами статьи */
export namespace WordRespType {
	// Получение перевода
	// export type GetOne = Translate
	// export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	// export type GetOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	// export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание перевода
	export type CreateOne = Word
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap


	// Обновление перевода
	// export type UpdateOne = Translate
	// export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	// export type UpdateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	// export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление перевода
	// export type Delete = true
	// export type DeleteSuccessWrap = GeneralRespType.Success<Payload<null>>
	// export type DeleteFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	// export type DeleteWrap = DeleteSuccessWrap | DeleteFailWrap

	// ====================================

	type Payload<T> = { words: T }
}
