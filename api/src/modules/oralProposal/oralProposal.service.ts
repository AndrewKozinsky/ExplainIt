import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
// import { Sequelize } from 'sequelize-typescript'
// import { Article } from './model/oralProposal.model'
import CreateOralProposalDto from './dto/createOralProposal.dto'
import { OralProposalRespType } from './response/responseTypes'
import { HelperService } from '../helper/helper.service'
import { OralProposal } from './model/oralProposal.model'
import UpdateOralProposalDto from './dto/updateOralProposal.dto'
// import UpdateOralProposalDto from './dto/updateOralProposal.dto'
// import { ProposalsGroup } from '../proposalsGroup/model/proposalsGroup.model'

@Injectable()
export class OralProposalService {
	constructor(
		// private sequelize: Sequelize,

		@InjectModel(OralProposal)
		private oralProposalModel: typeof OralProposal,

		private readonly helperService: HelperService
	) {}

	// Получение всех предложений
	/*async getAll(): Promise<OralProposalRespType.GetAll | never> {
		return this.helperService.runQuery<OralProposalRespType.GetAll>(() => {
			return this.oralProposalModel.findAll({
				attributes: ['id', 'name', 'published', 'order'],
				order: [['order', 'ASC']]
			})
		})
	}*/

	// Получение предложения
	/*async getOne(articleId: number): Promise<OralProposalRespType.GetOne | null | never> {
		return this.helperService.runQuery<OralProposalRespType.GetOne | null>(() => {
			return this.oralProposalModel.findByPk(
				articleId,
				{ include: [ProposalsGroup] }
			)
		})
	}*/

	// Создание предложения
	async createOne(articleDto: CreateOralProposalDto): Promise<OralProposalRespType.CreateOne | never> {
		return this.helperService.runQuery<OralProposalRespType.CreateOne>(() => {
			return this.oralProposalModel.create(articleDto)
		})
	}

	// Обновление предложения
	async updateOne(articleId: number, articleDto: UpdateOralProposalDto): Promise<OralProposalRespType.UpdateOne | never> {
		return this.helperService.runQuery<OralProposalRespType.UpdateOne>(async () => {
			const result = await this.oralProposalModel.update(
				articleDto,
				{
					where: { id: articleId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление предложения
	async deleteOne(proposalId: number): Promise<OralProposalRespType.DeleteOne | never> {
		return this.helperService.runQuery<OralProposalRespType.DeleteOne>(async () => {
			await this.oralProposalModel.destroy(
				{
					where: { id: proposalId },
				}
			)

			return true
		})
	}
}
