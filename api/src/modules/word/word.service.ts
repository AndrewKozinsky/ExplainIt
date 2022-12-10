import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateWordDto from './dto/createWord.dto'
import { TranslateRespType } from './response/responseTypes'
import { HelperService } from '../helper/helper.service'
import { Word } from './model/word.model'
// import { WritingProposal } from './model/translate.model'
// import UpdateTranslateDto from './dto/updateTranslate.dto'

@Injectable()
export class WordService {
	constructor(
		// private sequelize: Sequelize,

		// @InjectModel(Translate)
		// private translateModel: typeof Translate,

		// private readonly helperService: HelperService
	) {}

	// Получение перевода
	/*async getOne(articleId: number): Promise<TranslateRespType.GetOne | null | never> {
		return this.helperService.runQuery<TranslateRespType.GetOne | null>(() => {
			return this.translateModel.findByPk(articleId)
		})
	}*/

	// Создание перевода
	/*async createOne(articleDto: CreateWordDto): Promise<TranslateRespType.CreateOne | never> {
		return this.helperService.runQuery<TranslateRespType.CreateOne>(() => {
			return this.translateModel.create(articleDto)
		})
	}*/

	// Обновление перевода
	/*async updateOne(articleId: number, articleDto: UpdateWritingProposalDto): Promise<WritingProposalRespType.UpdateOne | never> {
		return this.helperService.runQuery<TranslateRespType.UpdateOne>(async () => {
			const result = await this.translateModel.update(
				articleDto,
				{
					where: { id: articleId },
					returning: true
				}
			)

			return result[1][0]
		})
	}*/

	// Удаление предложения
	/*async deleteOne(proposalId: number): Promise<TranslateRespType.Delete | never> {
		return this.helperService.runQuery<TranslateRespType.Delete>(async () => {
			await this.oralProposalModel.destroy(
				{
					where: { id: proposalId },
				}
			)

			return true
		})
	}*/

	// Удаление предложений с переданном идентификатором группы
	/*async deleteProposalsWithGroup(groupId: number): Promise<TranslateRespType.Delete | never> {
		return this.helperService.runQuery<TranslateRespType.Delete>(async () => {
			await this.oralProposalModel.destroy(
				{
					where: { proposalsGroupId: groupId },
				}
			)

			return true
		})
	}*/
}
