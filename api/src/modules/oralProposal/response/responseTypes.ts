import { OralProposal } from '../model/oralProposal.model'
import { GeneralRespType } from '../../../types/generalResponse'
import { ProposalsGroup } from '../../proposalsGroup/model/proposalsGroup.model'

/** Типы данных возвращаемыми методами статьи */
export namespace OralProposalRespType {
	// Получение всех предложений
	// export type GetAll = ListItem[]
	// export type GetAllWrap = GeneralRespType.Success<Payload<GetAll>>

	// Получение предложения
	// export type GetOne = OralProposal
	// export type GetOneSuccessWrap = GeneralRespType.Success<Payload<GetOne>>
	// export type GetOneFailWrap = GeneralRespType.Fail
	// export type GetOneWrap = GetOneSuccessWrap | GetOneFailWrap

	// Создание предложения
	export type CreateOne = OralProposal
	export type CreateOneSuccessWrap = GeneralRespType.Success<Payload<CreateOne>>
	export type CreateOneFailWrap = GeneralRespType.Fail
	export type CreateOneWrap = CreateOneSuccessWrap | CreateOneFailWrap


	// Обновление предложения
	// export type UpdateOne = OralProposal
	// export type UpdateOneSuccessWrap = GeneralRespType.Success<Payload<UpdateOne>>
	// export type UpdateOneFailWrap = GeneralRespType.Fail
	// export type UpdateOneWrap = UpdateOneSuccessWrap | UpdateOneFailWrap

	// Удаление предложения
	// export type DeleteOne = true
	// export type DeleteOneSuccessWrap = GeneralRespType.Success<Payload<null>>
	// export type DeleteOneFailWrap = GeneralRespType.Fail
	// export type DeleteOneWrap = DeleteOneSuccessWrap | DeleteOneFailWrap

	// ====================================

	// Статья с сокращённым набором данных
	// type ListItem = Pick<OralProposal, 'id' | 'name' | 'published' | 'order'>

	type Payload<T> = { articles: T }
}
