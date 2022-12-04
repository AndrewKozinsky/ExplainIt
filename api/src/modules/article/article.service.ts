import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Article } from './model/article.model'
import CreateArticleDto from './dto/createArticle.dto'
import { HelperService } from '../helper/helper.service'
import UpdateArticleDto from './dto/updateArticle.dto'
import { ProposalsGroup } from '../proposalsGroup/model/proposalsGroup.model'
import { ArticleRespType } from './response/responseTypes'

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
				attributes: ['id', 'name', 'published', 'order'],
				order: [['order', 'ASC']]
			})
		})
	}

	// Получение статьи
	async getOne(articleId: number): Promise<ArticleRespType.GetOne | null | never> {
		return this.helperService.runQuery<ArticleRespType.GetOne | null>(() => {
			return this.articleModel.findByPk(
				articleId,
				{ include: [ProposalsGroup] }
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