import { Article } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import CreateArticleDto from './dto/create-article.dto'
import { HelperService } from '../helper/helper.service'

@Injectable()
export class ArticlesService {
	constructor(
		private readonly prismaService: PrismaService,
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
