import { Inject, Injectable } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'
import { Article, Prisma, PrismaClient } from '../../../prisma/client'
import UpdateArticleDto from './dto/update-article.dto'

@Injectable()
export class ArticlesService {
	constructor(
		@Inject('prismaClient') private prismaService: PrismaClient,
		private readonly helperService: HelperService
	) {}
	
	// Поиск статьи
	async getOne(articleId: number): Promise<Article | null | never> {
		return this.helperService.runQuery<Article | null>(() => {
			return this.prismaService.article.findFirst({
				where: {
					id: articleId
				}
			})
		})
	}
	
	// Создание статьи
	async create(articleDto: CreateArticleDto): Promise<Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.create({
				data: articleDto
			})
		})
	}
	
	// Обновление статьи
	async update(articleId: number, articleDto: UpdateArticleDto): Promise<Article | never> {
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
	async deleteOne(articleId: number): Promise<null | never> {
		await this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.delete({
				where: {
					id: articleId
				}
			})
		})
		
		return null
	}
	
	// Удаление всех статей
	async deleteAll(): Promise<Prisma.BatchPayload> {
		return await this.helperService.runQuery<Prisma.BatchPayload>(() => {
			return this.prismaService.article.deleteMany({})
		})
	}
}
