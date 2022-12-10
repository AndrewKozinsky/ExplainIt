import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { WordController } from './word.controller'
import { WordService } from './word.service'
import { Word } from './model/word.model'
import { WritingProposalModule } from '../writingProposal/writingProposal.module'

@Module({
	imports: [
		// SequelizeModule.forFeature([Translate]),
		// WritingProposalModule,
		// forwardRef(() => ProposalsGroupModule)
	],
	controllers: [WordController],
	providers: [WordService],
})
export class WordModule {}
