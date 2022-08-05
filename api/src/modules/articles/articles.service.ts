import { Inject, Injectable } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'
import { Article, Prisma, PrismaClient } from '../../../prisma/client'
import UpdateArticleDto from './dto/update-article.dto'
import { ArticleRespType } from '../../types/responseTypes'

@Injectable()
export class ArticlesService {
	constructor(
		@Inject('prismaClient') private prismaService: PrismaClient,
		private readonly helperService: HelperService
	) {}

	// Получение всех статей
	async getAll(): Promise<ArticleRespType.ArticleItem[] | never> {
		return this.helperService.runQuery<ArticleRespType.ArticleItem[]>(() => {
			return this.prismaService.article.findMany({
				select: {
					id: true,
					name: true,
					published: true,
					order: true
				},
				orderBy: {
					order: 'asc'
				}
			})
		})
	}

	// Получение статьи
	async getOne(articleId: number): Promise<ArticleRespType.Article | null | never> {
		return this.helperService.runQuery<Article | null>(() => {
			return this.prismaService.article.findFirst({
				where: {
					id: articleId
				}
			})
		})
	}

	// Создание статьи
	async create(articleDto: CreateArticleDto): Promise<ArticleRespType.Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.create({
				data: articleDto
			})
		})
	}

	// Обновление статьи
	async update(articleId: number, articleDto: UpdateArticleDto): Promise<ArticleRespType.Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.update({
				where: {
					id: articleId
				},
				data: articleDto
			})
		})
	}

	// Удаление статьи
	async deleteOne(articleId: number): Promise<ArticleRespType.Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.delete({
				where: {
					id: articleId
				}
			})
		})
	}

	// Удаление всех статей
	async deleteAll(): Promise<Prisma.BatchPayload | never> {
		return this.helperService.runQuery<Prisma.BatchPayload>(() => {
			return this.prismaService.article.deleteMany()
		})
	}
}
