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
	Res,
	UseGuards
} from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { ArticlesService } from './articles.service'
import { HelperService } from '../helper/helper.service'
import { AuthGuard } from '../../common/auth.guard'
import UpdateArticleDto from './dto/update-article.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ArticleRespType } from '../../types/responseTypes'
import { Response } from 'express'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
	constructor(
		private readonly articlesService: ArticlesService,
		private readonly helperService: HelperService
	) {
	}

	@Get()
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Получение всех статей отсортированных по правильному порядку.' })
	async getAll(): ArticleRespType.SuccessReturn<ArticleRespType.ArticleItem[]> {
		// Найти статью в БД
		const foundedArticles = await this.articlesService.getAll()

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.ArticleItem[]>> (
			{ articles: foundedArticles }, HttpStatus.OK
		)
	}

	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Получение статьи по идентификатору.' })
	async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]> {
		// Найти статью в БД
		const foundArticle = await this.articlesService.getOne(id)

		if (foundArticle) {
			return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.Article[]>> (
				{ articles: [foundArticle] }, HttpStatus.OK
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
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Создание новой статьи.' })
	async create(@Body() articleDto: CreateArticleDto): ArticleRespType.SuccessReturn<ArticleRespType.Article[]> {
		// Создать новую статью в БД
		const createdArticle = await this.articlesService.create(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.Article[]>>(
			{ articles: [createdArticle] }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Обновлении статьи по идентификатору.' })
	async update(
		@Body() articleDto: UpdateArticleDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]> {
		// Обновить статью в БД
		const updatedArticle = await this.articlesService.update(id, articleDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedArticle) {
			return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.Article[]>> (
				{ articles: [updatedArticle] }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}

	@Delete('/all')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Удаление всех статей.', description: 'Нужно при тестировании' })
	async deleteAll(): ArticleRespType.SuccessReturn<ArticleRespType.Article[]> {
		// Удалить все статьи
		await this.articlesService.deleteAll()

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.Article[]>>(
			{ articles: [] }, HttpStatus.OK
		)
	}

	@Delete(':id')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Удаление статьи по идентификатору.' })
	async deleteOne(
		@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) res: Response
	): ArticleRespType.SuccessOrFailReturn<ArticleRespType.Article[]> {
		// Удалить статью
		const deletedArticle = await this.articlesService.deleteOne(id)

		if (deletedArticle) {
			return this.helperService.createSuccessResponse<ArticleRespType.Payload<ArticleRespType.Article[]>> (
				{ articles: [deletedArticle] }, HttpStatus.OK
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
