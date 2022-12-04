import { ProposalsGroup } from 'src/modules/proposalsGroup/model/proposalsGroup.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами группы упражнений */
export namespace ProposalsGroupRespType {
	// Создание группы упражнений
	export type CreateOne = ProposalsGroup
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap

	// Обновление статьи
	export type UpdateOne = ProposalsGroup
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление группы упражнений
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	type Payload<T> = { proposalsGroups: T }
}
