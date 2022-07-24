import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'
import { ArticlesService } from './articles.service'
import { HelperService } from '../helper/helper.service'
import { AuthGuard } from '../../common/auth.guard'

@Controller('articles')
export class ArticlesController {
	constructor(
		private readonly articlesService: ArticlesService,
		private readonly helperService: HelperService,
	) { }

    @Post()
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.CREATED)
	async create(@Body() articleDto: CreateArticleDto) {
		console.log(process.env.WORK_MODE)
		// Создать новую статью в БД
		const createdArticle = await this.articlesService.create(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ article: createdArticle }, HttpStatus.CREATED
		)
	}
}

