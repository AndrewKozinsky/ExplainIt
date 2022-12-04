import { Injectable } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { InjectModel } from '@nestjs/sequelize'
import { HelperService } from '../helper/helper.service'
import { ProposalsGroup } from './model/proposalsGroup.model'
import CreateGroupDto from './dto/createGroup.dto'
import { ProposalsGroupRespType } from './response/responseTypes'
import UpdateGroupDto from './dto/updateGroup.dto'

@Injectable()
export class ProposalsGroupService {
	constructor(
		private sequelize: Sequelize,

		@InjectModel(ProposalsGroup)
		private proposalsGroup: typeof ProposalsGroup,

		private readonly helperService: HelperService
	) {}

	// Существует ли группа предложений?
	async isExist(groupId: number): Promise<boolean> {
		const foundedArticle = await this.proposalsGroup.findByPk(groupId)
		return !!foundedArticle
	}

	// Создание группы упражнений
	async createOne(proposalsGroupDto: CreateGroupDto): Promise<ProposalsGroupRespType.CreateOne | never> {
		return this.helperService.runQuery<ProposalsGroupRespType.CreateOne>(() => {
			return this.proposalsGroup.create(proposalsGroupDto)
		})
	}

	// Обновление группы упражнений
	async updateOne(groupId: number, groupDto: UpdateGroupDto): Promise<ProposalsGroupRespType.UpdateOne> {
		return this.helperService.runQuery<ProposalsGroupRespType.UpdateOne>(async () => {
			const result = await this.proposalsGroup.update(
				groupDto,
				{
					where: { id: groupId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление группы упражнений
	async deleteOne(groupId: number): Promise<ProposalsGroupRespType.DeleteOne | never> {
		return this.helperService.runQuery<true>(async () => {
			await this.proposalsGroup.destroy(
				{
					where: { id: groupId }
				}
			)

			return true
		})
	}
}
