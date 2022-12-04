import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Res
} from '@nestjs/common'
import CreateArticleDto from './dto/createArticle.dto'
import { ArticleService } from './article.service'
import { HelperService } from '../helper/helper.service'
import UpdateArticleDto from './dto/updateArticle.dto'
import { Response } from 'express'
import { ArticleRespType } from './response/responseTypes'

@Controller('articles')
export class ArticleController {
	constructor(
		private readonly articlesService: ArticleService,
		private readonly helperService: HelperService
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	async getAll(): Promise<ArticleRespType.GetAllWrap> {
		// Найти статью в БД
		const foundedArticles = await this.articlesService.getAll()

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse (
			{ articles: foundedArticles }, HttpStatus.OK
		)
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.GetOneWrap> {
		// Найти статью в БД
		const foundArticle = await this.articlesService.getOne(id)

		if (foundArticle) {
			return this.helperService.createSuccessResponse (
				{ articles: foundArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)

			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() articleDto: CreateArticleDto): Promise<ArticleRespType.CreateOneWrap> {
		// Создать новую статью в БД
		const createdArticle = await this.articlesService.createOne(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ articles: createdArticle }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() articleDto: UpdateArticleDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.UpdateOneWrap> {
		// Обновить статью в БД
		const updatedArticle = await this.articlesService.updateOne(id, articleDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedArticle) {
			return this.helperService.createSuccessResponse (
				{ articles: updatedArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.DeleteOneWrap> {
		// Удалить статью
		const isDeleted = await this.articlesService.deleteOne(id)

		if (isDeleted) {
			return this.helperService.createSuccessResponse (
				{ articles: null }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}
}
