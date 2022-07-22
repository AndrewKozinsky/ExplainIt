import { Module } from '@nestjs/common'
import { ArticlesModule } from '../articles/articles.module'
import { HelperModule } from '../helper/helper.module'

@Module({
	imports: [ArticlesModule, HelperModule],
	controllers: [],
	providers: []
})

export class AppModule {}
