import { OralProposal } from '../model/oralProposal.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами статьи */
export namespace OralProposalRespType {
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
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	type Payload<T> = { oralProposals: T }
}
