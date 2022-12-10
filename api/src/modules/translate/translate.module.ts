import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { TranslateController } from './translate.controller'
import { TranslateService } from './translate.service'
import { Translate } from './model/translate.model'
import { WritingProposalModule } from '../writingProposal/writingProposal.module'

@Module({
	imports: [
		SequelizeModule.forFeature([Translate]),
		WritingProposalModule,
		// forwardRef(() => ProposalsGroupModule)
	],
	controllers: [TranslateController],
	providers: [TranslateService],
})
export class TranslateModule {}
