import {Body, Controller, Post } from '@nestjs/common'
import CreateArticleDto from './dto/create-article.dto'

@Controller('articles')
export class ArticlesController {
    @Post()
	create(@Body() createArticleDto: CreateArticleDto) {
		return 'createArticleDto'
	}
}
