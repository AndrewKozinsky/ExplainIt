import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Article } from './model/article.model'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'
import UpdateArticleDto from './dto/update-article.dto'
import { ArticleRespType } from '../../types/responseTypes'

@Injectable()
export class ArticlesService {
	constructor(
		private sequelize: Sequelize,

		@InjectModel(Article)
		private articleModel: typeof Article,
		private readonly helperService: HelperService
	) {}

	// Получение всех статей
	async getAll(): Promise<ArticleRespType.ArticleListItem[] | never> {
		return this.helperService.runQuery<ArticleRespType.ArticleListItem[]>(() => {
			return this.articleModel.findAll({
				attributes: ['id', 'name', 'published', 'order'],
				order: [['order', 'ASC']]
			})
		})
	}

	// Получение статьи
	async getOne(articleId: number): Promise<ArticleRespType.FullArticle | null | never> {
		return this.helperService.runQuery<Article | null>(() => {
			return this.articleModel.findByPk(articleId)
		})
	}

	// Создание статьи
	async createOne(articleDto: CreateArticleDto): Promise<ArticleRespType.FullArticle | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.articleModel.create(articleDto)
		})
	}

	// Обновление статьи
	async updateOne(articleId: number, articleDto: UpdateArticleDto): Promise<ArticleRespType.FullArticle | never> {
		return this.helperService.runQuery<Article>(async () => {
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
	async deleteOne(articleId: number): Promise<true | never> {
		return this.helperService.runQuery<true>(async () => {
			await this.articleModel.destroy(
				{
					where: { id: articleId },
				}
			)

			return true
		})
	}
}
