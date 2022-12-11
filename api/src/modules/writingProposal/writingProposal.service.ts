import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateWritingProposalDto from './dto/createWritingProposal.dto'
import { WritingProposalRespType } from './response/responseTypes'
import { HelperService } from '../helper/helper.service'
import { WritingProposal } from './model/writingProposal.model'
import UpdateWritingProposalDto from './dto/updateWritingProposal.dto'
import { ArticleService } from '../article/article.service'
import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'

@Injectable()
export class WritingProposalService {
	constructor(
		// private sequelize: Sequelize,

		@InjectModel(WritingProposal)
		private writingProposalModel: typeof WritingProposal,

		private readonly articlesService: ArticleService,
		// private readonly proposalsGroupService: ProposalsGroupService,
		private readonly helperService: HelperService
	) {}

	// Получение предложения
	async getOne(articleId: number): Promise<WritingProposalRespType.GetOne | null | never> {
		return this.helperService.runQuery<WritingProposalRespType.GetOne | null>(() => {
			return this.writingProposalModel.findByPk(articleId)
		})
	}

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
	async updateOne(proposalId: number, proposalDto: UpdateWritingProposalDto): Promise<WritingProposalRespType.UpdateOne | never> {
		return this.helperService.runQuery<WritingProposalRespType.UpdateOne>(async () => {
			const result = await this.writingProposalModel.update(
				proposalDto,
				{
					where: { id: proposalId },
					returning: true
				}
			)

			// В зависимости от наличия или отсутствия данных в rawTranslations проставить payAtn
			// в статьях, группах и письменных предложениях в true или false
			if (proposalDto.rawTranslations !== undefined) {
				const isRawTranslationsExists = !!(proposalDto.rawTranslations && proposalDto.rawTranslations.length)
				await this.setPayAtnToAllEntities(isRawTranslationsExists, proposalId)
			}

			return result[1][0]
		})
	}

	async setPayAtnToAllEntities(payAtnValue: boolean, proposalId: number) {
		const proposal = await this.getOne(proposalId)
		if (!proposal) return

		// const proposalGroup = await this.proposalsGroupService.getOne(proposal.proposalsGroupId)
		// if (!proposalGroup) return

		// const dto = { payAtn: payAtnValue }

		/*await Promise.all([
			this.updateOne(proposalId, dto),
			this.proposalsGroupService.updateOne(proposal.proposalsGroupId, dto),
			this.articlesService.updateOne(proposalGroup.articleId, dto)
		])*/
	}

	// Удаление предложения
	async deleteOne(proposalId: number): Promise<WritingProposalRespType.Delete | never> {
		return this.helperService.runQuery<WritingProposalRespType.Delete>(async () => {
			await this.writingProposalModel.destroy(
				{
					where: { id: proposalId },
				}
			)

			return true
		})
	}

	// Удаление предложений с переданном идентификатором группы
	async deleteProposalsWithGroup(groupId: number): Promise<WritingProposalRespType.Delete | never> {
		return this.helperService.runQuery<WritingProposalRespType.Delete>(async () => {
			await this.writingProposalModel.destroy(
				{
					where: { proposalsGroupId: groupId },
				}
			)

			return true
		})
	}
}
