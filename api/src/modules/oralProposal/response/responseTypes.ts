import { OralProposal } from '../model/oralProposal.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами статьи */
export namespace OralProposalRespType {
	// Получение статьи
	export type GetOne = OralProposal
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание предложения
	export type CreateOne = OralProposal
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap


	// Обновление предложения
	export type UpdateOne = OralProposal
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление предложения
	export type Delete = true
	export type DeleteSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteFailWrap = GeneralRespType.Fail
	export type DeleteWrap = DeleteSuccessWrap | DeleteFailWrap

	// ====================================

	type Payload<T> = { oralProposals: T }
}
