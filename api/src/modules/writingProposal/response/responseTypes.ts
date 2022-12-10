import { WritingProposal } from '../model/writingProposal.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами статьи */
export namespace WritingProposalRespType {
	// Получение предложения
	export type GetOne = WritingProposal
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание предложения
	export type CreateOne = WritingProposal
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap


	// Обновление предложения
	// export type UpdateOne = WritingProposal
	// export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	// export type UpdateOneFailWrap = GeneralRespType.Fail
	// export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление предложения
	export type Delete = true
	export type DeleteSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteFailWrap = GeneralRespType.Fail
	export type DeleteWrap = DeleteSuccessWrap | DeleteFailWrap

	// ====================================

	type Payload<T> = { writingProposals: T }
}
