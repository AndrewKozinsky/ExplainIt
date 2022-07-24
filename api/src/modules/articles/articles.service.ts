import { Inject, Injectable } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'
import { Article, PrismaClient } from 'prisma/client'

@Injectable()
export class ArticlesService {
	constructor(
		@Inject('prismaClient') private prismaService: PrismaClient,
		private readonly helperService: HelperService
	) {}

	async create(articleDto: CreateArticleDto): Promise<Article | never> {
		return this.helperService.runQuery<Article>(() => {
			return this.prismaService.article.create({
				data: articleDto
			})
		})
	}
}
