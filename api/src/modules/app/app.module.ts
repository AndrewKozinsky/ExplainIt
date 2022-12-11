import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleModule } from '../article/article.module'
import { HelperModule } from '../helper/helper.module'
import { OralProposalModule } from '../oralProposal/oralProposal.module'
import { ProposalsGroupModule } from '../proposalsGroup/proposalsGroup.module'
import { WordModule } from '../word/word.module'
import { WritingProposalModule } from '../writingProposal/writingProposal.module'
import { TranslateModule } from '../translate/translate.module'

// TODO Раскомментируй proposalsGroupService в api/src/modules/writingProposal/writingProposal.service.ts и разберись почему появляется ошибка
// TODO В нужных таблицах сделай свойство payAtn куда автоматически бы записывалось true или false в зависимости от того появились или исчезли бы предложения из блока «Необработанные переводы» или есть ли непроверенные переводы.
// TODO Напиши функцию переводящую присланный массив статей в массив данных подходящих для вывода

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
		WritingProposalModule,
		TranslateModule,
		WordModule,
		HelperModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
