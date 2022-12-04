import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticlesModule } from '../articles/articles.module'
import { HelperModule } from '../helper/helper.module'
import { ExercisesGroupModule } from '../exercisesGroup/exercisesGroup.module'
import { ExercisesGroup } from '../exercisesGroup/model/exercisesGroup.model'
import { Article } from '../articles/model/article.model'

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'db',
			port: 5432,
			username: 'postgres',
			password: 'kxPQor_cf23GR',
			database: 'explain',
			models: [__dirname + '/**/*.model.ts'],

			autoLoadModels: true,
			synchronize: true,
			sync: { alter: true, force: false }
		}),
		ArticlesModule,
		ExercisesGroupModule,
		HelperModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
