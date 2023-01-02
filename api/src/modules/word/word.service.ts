import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import CreateWordDto from './dto/createWord.dto'
import Word from './model/word.model'
import WordRespType from './response/responseTypes'
import HelperService from '../helper/helper.service'
import UpdateWordDto from './dto/updateWord.dto'

@Injectable()
export class WordService {
	constructor(
		// private sequelize: Sequelize,

		@InjectModel(Word)
		private wordModel: typeof Word,

		private readonly helperService: HelperService
	) {}

	// Получение слова
	async getOne(articleId: number): Promise<WordRespType.GetOne | null | never> {
		return this.helperService.runQuery<WordRespType.GetOne | null>(() => {
			return this.wordModel.findByPk(articleId)
		})
	}

	// Создание слова
	async createOne(createWordDto: CreateWordDto): Promise<WordRespType.CreateOne | never> {
		return this.helperService.runQuery<WordRespType.CreateOne>(() => {
			return this.wordModel.create(createWordDto)
		})
	}

	// Обновление слова
	async updateOne(wordId: number, wordDto: UpdateWordDto): Promise<WordRespType.UpdateOne | never> {
		return this.helperService.runQuery<WordRespType.UpdateOne>(async () => {
			const result = await this.wordModel.update(
				wordDto,
				{
					where: { id: wordId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление слова
	async deleteOne(proposalId: number): Promise<WordRespType.Delete | never> {
		return this.helperService.runQuery<WordRespType.Delete>(async () => {
			await this.wordModel.destroy(
				{
					where: { id: proposalId },
				}
			)

			return true
		})
	}

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
