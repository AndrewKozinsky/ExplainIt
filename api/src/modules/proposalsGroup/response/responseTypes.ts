import { GeneralRespType } from '../../../types/generalResponse'
import { ProposalsGroup } from '../model/proposalsGroup.model'
import ModelTypes from '../../../types/modelTypes'

/** Типы данных возвращаемыми методами группы упражнений */
namespace ProposalsGroupRespType {
	// Получение группы предложений
	export type GetOne = ProposalsGroup
	export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	export type GetOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание группы предложений
	export type CreateOne = ProposalsGroup
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap

	// Обновление группы предложений
	export type UpdateOne = ProposalsGroup
	export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	export type UpdateOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление группы предложений
	export type DeleteOne = true
	export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	export type DeleteOneFailWrap = GeneralRespType.Fail | GeneralRespType.Error
	export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	type Payload<T> = { proposalsGroups: T }
	export type GroupType = ModelTypes.ProposalGroup.GroupType
}

export default ProposalsGroupRespType
