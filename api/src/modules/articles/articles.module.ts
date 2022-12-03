import { Module } from '@nestjs/common'
import { ArticlesController } from './articles.controller'
import { ArticlesService } from './articles.service'
import { Article } from './article.model'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
	imports: [SequelizeModule.forFeature([Article])],
	controllers: [ArticlesController],
	providers: [ArticlesService]
})
export class ArticlesModule {}
