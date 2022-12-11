import { Injectable } from '@nestjs/common'
// import { Sequelize } from 'sequelize-typescript'
import { InjectModel } from '@nestjs/sequelize'
import { HelperService } from '../helper/helper.service'
import { ProposalsGroup } from './model/proposalsGroup.model'
import CreateGroupDto from './dto/createGroup.dto'
import { ProposalsGroupRespType } from './response/responseTypes'
// import UpdateGroupDto from './dto/updateGroup.dto'
// import { OralProposal } from '../oralProposal/model/oralProposal.model'
// import { OralProposalService } from '../oralProposal/oralProposal.service'
// import { WritingProposalService } from '../writingProposal/writingProposal.service'

@Injectable()
export class ProposalsGroupService {
	constructor(
		// private sequelize: Sequelize,

		@InjectModel(ProposalsGroup)
		private proposalsGroupModel: typeof ProposalsGroup,

		private readonly helperService: HelperService,
		// private readonly oralProposalService: OralProposalService,
		// private readonly writingProposalService: WritingProposalService
	) {}

	// Получение группы предложений
	/*async getOne(groupId: number): Promise<ProposalsGroupRespType.GetOne | null | never> {
		return this.helperService.runQuery<ProposalsGroupRespType.GetOne | null>(() => {
			return this.proposalsGroupModel.findByPk(
				groupId,
				{ include: [OralProposal] }
			)
		})
	}*/

	// Существует ли группа предложений?
	async isExist(groupId: number): Promise<boolean> {
		const foundedArticle = await this.proposalsGroupModel.findByPk(groupId)
		return !!foundedArticle
	}

	// Создание группы упражнений
	async createOne(proposalsGroupDto: CreateGroupDto): Promise<ProposalsGroupRespType.CreateOne | never> {
		return this.helperService.runQuery<ProposalsGroupRespType.CreateOne>(() => {
			return this.proposalsGroupModel.create(proposalsGroupDto)
		})
	}

	// Обновление группы упражнений
	/*async updateOne(groupId: number, groupDto: UpdateGroupDto): Promise<ProposalsGroupRespType.UpdateOne> {
		return this.helperService.runQuery<ProposalsGroupRespType.UpdateOne>(async () => {
			const currentGroup = await this.getOne(groupId)

			if (groupDto.type !== currentGroup?.type) {
				// Тут нужно удалить все разговорные и письменные предложения относящиеся к этой группе
				await this.oralProposalService.deleteProposalsWithGroup(groupId)
				await this.writingProposalService.deleteProposalsWithGroup(groupId)
			}

			const result = await this.proposalsGroupModel.update(
				groupDto,
				{
					where: { id: groupId },
					returning: true
				}
			)

			return result[1][0]
		})
	}*/

	// Удаление группы упражнений
	/*async deleteOne(groupId: number): Promise<ProposalsGroupRespType.DeleteOne | never> {
		return this.helperService.runQuery<true>(async () => {
			await this.proposalsGroupModel.destroy(
				{
					where: { id: groupId }
				}
			)

			return true
		})
	}*/
}
