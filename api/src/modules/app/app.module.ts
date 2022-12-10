import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleModule } from '../article/article.module'
import { HelperModule } from '../helper/helper.module'
import { OralProposalModule } from '../oralProposal/oralProposal.module'
import { ProposalsGroupModule } from '../proposalsGroup/proposalsGroup.module'

// TODO Сделай таблицу письменных предложений
// TODO При изменении типа группы предложений очищать массив предложений прикреплённый к этой группе.
// TODO Сделай таблицу переводов
// TODO Сделай таблицу слов

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
		ArticleModule,
		ProposalsGroupModule,
		OralProposalModule,
		HelperModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
