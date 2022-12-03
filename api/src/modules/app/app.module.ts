import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticlesModule } from '../articles/articles.module'
import { Article } from '../articles/article.model'
import { HelperModule } from '../helper/helper.module'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'db',
			port: 5432,
			username: 'postgres',
			password: 'kxPQor_cf23GR',
			database: 'explain',
			models: [Article],

			autoLoadModels: true,
			synchronize: true,
			sync: { alter: true, force: true }
		}),
		ArticlesModule,
		HelperModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
