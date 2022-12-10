import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleModule } from '../article/article.module'
import { HelperModule } from '../helper/helper.module'
import { OralProposalModule } from '../oralProposal/oralProposal.module'
import { ProposalsGroupModule } from '../proposalsGroup/proposalsGroup.module'
import { WritingProposalModule } from '../writingProposal/writingProposal.module'
import { TranslateModule } from '../translate/translate.module'

// TODO Сделай таблицу слов
// TODO При удалении предложения нужно автоматически удалять его слова

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
			sync: { alter: true, force: true }
		}),
		ArticleModule,
		ProposalsGroupModule,
		OralProposalModule,
		WritingProposalModule,
		TranslateModule,
		HelperModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
