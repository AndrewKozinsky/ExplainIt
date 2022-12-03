import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Sequelize } from 'sequelize-typescript'
import { Article } from './article.model'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'
// import { Article, Prisma, PrismaClient } from '../../../prisma/client'
// import UpdateArticleDto from './dto/update-article.dto'
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
	async getAll(): Promise<ArticleRespType.ArticleItem[] | never> {
		return this.helperService.runQuery<ArticleRespType.ArticleItem[]>(() => {
			return this.articleModel.findAll()

			// return this.prismaService.article.findMany({
			// 	select: {
			// 		id: true,
			// 		name: true,
			// 		published: true,
			// 		order: true
			// 	},
			// 	orderBy: {
			// 		order: 'asc'
			// 	}
			// })
		})
	}

	// Получение статьи
	/*async getOne(articleId: number): Promise<ArticleRespType.Article | null | never> {
		return this.helperService.runQuery<Article | null>(() => {
			return this.prismaService.article.findFirst({
				where: {
					id: articleId
				}
			})
		})
	}*/

	// Создание статьи
	async create(articleDto: CreateArticleDto): Promise<ArticleRespType.ArticleItem | never> {
		return this.helperService.runQuery<Article>(() => {

			return this.articleModel.create(articleDto)
			// return this.articleModel.create({ name: 'name', chapter: '20 глава', label: 'label', summary: 'summary', content: 'content', order: 2 })
		})
	}

	// Обновление статьи
	/*async update(articleId: number, articleDto: UpdateArticleDto): Promise<ArticleRespType.Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.update({
				where: {
					id: articleId
				},
				data: articleDto
			})
		})
	}*/

	// Удаление статьи
	/*async deleteOne(articleId: number): Promise<ArticleRespType.Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.delete({
				where: {
					id: articleId
				}
			})
		})
	}*/

	// Удаление всех статей
	/*async deleteAll(): Promise<Prisma.BatchPayload | never> {
		return this.helperService.runQuery<Prisma.BatchPayload>(() => {
			return this.prismaService.article.deleteMany()
		})
	}*/
}
