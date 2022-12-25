import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Article } from './model/article.model'
import CreateArticleDto from './dto/createArticle.dto'
import { HelperService } from '../helper/helper.service'
import UpdateArticleDto from './dto/updateArticle.dto'
import { ProposalsGroup } from '../proposalsGroup/model/proposalsGroup.model'
import ArticleRespType from './response/responseTypes'
import { OralProposal } from '../oralProposal/model/oralProposal.model'
import { WritingProposal } from '../writingProposal/model/writingProposal.model'
import { Translate } from '../translate/model/translate.model'
import { Word } from '../word/model/word.model'
import { QueryTypes } from 'sequelize'

@Injectable()
export class ArticleService {
	constructor(
		private sequelize: Sequelize,

		@InjectModel(Article)
		private articleModel: typeof Article,

		private readonly helperService: HelperService
	) {}

	// Получение всех статей
	async getAll(): Promise<ArticleRespType.GetAll | never> {
		return this.helperService.runQuery<ArticleRespType.GetAll>(() => {
			return this.articleModel.findAll({
				attributes: ['id', 'name', 'published', 'order', 'payAtn'],
				order: [['order', 'ASC']]
			})
		})
	}

	// Получение статьи
	// Подробнее про глубокую вложенность:
	// stackoverflow.com/questions/64540665/how-do-i-get-deep-nesting-of-data-in-sequelize
	async getOne(articleId: number): Promise<ArticleRespType.GetOne | null | never> {
		return this.helperService.runQuery<ArticleRespType.GetOne | null>(() => {
			return this.articleModel.findByPk(
				articleId,
				{
					include: {
						model: ProposalsGroup,
						include: [
							{
								model: OralProposal,
								include: [Word],
							},
							{
								model: WritingProposal,
								include: [Translate, Word]
							},
						]
					},
					order: [
						[{ model: ProposalsGroup, as: 'proposalsGroups' }, 'order', 'ASC'],
					],
				}
			)
		})
	}

	// Существует ли статья?
	async isExist(articleId: number): Promise<boolean> {
		const foundedArticle = await this.articleModel.findByPk(articleId)
		return !!foundedArticle
	}

	// Создание статьи
	async createOne(articleDto: CreateArticleDto): Promise<ArticleRespType.CreateOne | never> {
		return this.helperService.runQuery<ArticleRespType.CreateOne>(() => {
			return this.articleModel.create(articleDto)
		})
	}

	// Обновление статьи
	async updateOne(articleId: number, articleDto: UpdateArticleDto): Promise<ArticleRespType.UpdateOne | never> {
		return this.helperService.runQuery<ArticleRespType.UpdateOne>(async () => {
			const result = await this.articleModel.update(
				articleDto,
				{
					where: { id: articleId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление статьи
	async deleteOne(articleId: number): Promise<ArticleRespType.DeleteOne | never> {
		return this.helperService.runQuery<ArticleRespType.DeleteOne>(async () => {
			await this.articleModel.destroy(
				{
					where: { id: articleId },
				}
			)

			return true
		})
	}
}
