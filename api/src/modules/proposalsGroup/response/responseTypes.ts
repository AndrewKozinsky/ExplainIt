import { ProposalsGroup } from 'src/modules/proposalsGroup/model/proposalsGroup.model'
import { GeneralRespType } from '../../../types/generalResponse'

/** Типы данных возвращаемыми методами группы упражнений */
export namespace ProposalsGroupRespType {
	// Получение группы предложений
	export type GetOne = ProposalsGroup
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание группы предложений
	export type CreateOne = ProposalsGroup
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap

	// Обновление группы предложений
	export type UpdateOne = ProposalsGroup
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление группы предложений
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	type Payload<T> = { proposalsGroups: T }
}
