import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateWritingProposalDto from './dto/createWritingProposal.dto'
import { WritingProposalRespType } from './response/responseTypes'
import { HelperService } from '../helper/helper.service'
import { WritingProposal } from './model/writingProposal.model'
import UpdateWritingProposalDto from './dto/updateWritingProposal.dto'

@Injectable()
export class WritingProposalService {
	constructor(
		// private sequelize: Sequelize,

		@InjectModel(WritingProposal)
		private writingProposalModel: typeof WritingProposal,

		private readonly helperService: HelperService
	) {}

	// Получение предложения
	/*async getOne(articleId: number): Promise<WritingProposalRespType.GetOne | null | never> {
		return this.helperService.runQuery<WritingProposalRespType.GetOne | null>(() => {
			return this.writingProposalModel.findByPk(articleId)
		})
	}*/

	// Существует ли предложение?
	async isExist(groupId: number): Promise<boolean> {
		const foundedArticle = await this.writingProposalModel.findByPk(groupId)
		return !!foundedArticle
	}

	// Создание предложения
	async createOne(articleDto: CreateWritingProposalDto): Promise<WritingProposalRespType.CreateOne | never> {
		return this.helperService.runQuery<WritingProposalRespType.CreateOne>(() => {
			return this.writingProposalModel.create(articleDto)
		})
	}

	// Обновление предложения
	async updateOne(proposalId: number, articleDto: UpdateWritingProposalDto): Promise<WritingProposalRespType.UpdateOne | never> {
		return this.helperService.runQuery<WritingProposalRespType.UpdateOne>(async () => {
			const result = await this.writingProposalModel.update(
				articleDto,
				{
					where: { id: proposalId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление предложения
	/*async deleteOne(proposalId: number): Promise<WritingProposalRespType.Delete | never> {
		return this.helperService.runQuery<WritingProposalRespType.Delete>(async () => {
			await this.writingProposalModel.destroy(
				{
					where: { id: proposalId },
				}
			)

			return true
		})
	}*/

	// Удаление предложений с переданном идентификатором группы
	/*async deleteProposalsWithGroup(groupId: number): Promise<WritingProposalRespType.Delete | never> {
		return this.helperService.runQuery<WritingProposalRespType.Delete>(async () => {
			await this.writingProposalModel.destroy(
				{
					where: { proposalsGroupId: groupId },
				}
			)

			return true
		})
	}*/
}
