import { Module } from '@nestjs/common'
import { ArticlesModule } from '../articles/articles.module'
import { HelperModule } from '../helper/helper.module'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
	imports: [PrismaModule.forRoot(), ArticlesModule, HelperModule],
	controllers: [],
	providers: []
})

export class AppModule {}
