import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { ArticlesService } from './articles.service'
import { HelperService } from '../helper/helper.service'
import { AuthGuard } from '../../common/auth.guard'
import UpdateArticleDto from './dto/update-article.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
	constructor(
		private readonly articlesService: ArticlesService,
		private readonly helperService: HelperService
	) {
	}
	
	@Get(':id')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Получение статьи по идентификатору.' })
	async getOne(@Param('id', ParseIntPipe) id: number) {
		// Найти статью в БД
		const foundedArticle = await this.articlesService.getOne(id)
		
		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ article: foundedArticle }, HttpStatus.OK
		)
	}
	
	@Post()
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Создание новой статьи.' })
	async create(@Body() articleDto: CreateArticleDto) {
		// Создать новую статью в БД
		const createdArticle = await this.articlesService.create(articleDto)
		
		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ article: createdArticle }, HttpStatus.CREATED
		)
	}
	
	@Patch(':id')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Обновлении статьи по идентификатору.' })
	async update(@Body() articleDto: UpdateArticleDto, @Param('id', ParseIntPipe) id: number) {
		// Обновить статью в БД
		const updatedArticle = await this.articlesService.update(id, articleDto)
		
		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ article: updatedArticle }, HttpStatus.OK
		)
	}
	
	@Delete('/all')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Удаление всех статей.', description: 'Нужно при тестировании' })
	async deleteAll() {
		// Удалить все статьи
		await this.articlesService.deleteAll()
		
		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ articles: null }, HttpStatus.OK
		)
	}
	
	@Delete(':id')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Удаление статьи по идентификатору.' })
	async deleteOne(@Param('id', ParseIntPipe) id: number) {
		// Удалить статью
		await this.articlesService.deleteOne(id)
		
		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ article: null }, HttpStatus.OK
		)
	}
}
