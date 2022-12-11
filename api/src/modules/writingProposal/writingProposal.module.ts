import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { WritingProposalController } from './writingProposal.controller'
import { WritingProposalService } from './writingProposal.service'
import { WritingProposal } from './model/writingProposal.model'
import { ProposalsGroupModule } from '../proposalsGroup/proposalsGroup.module'
import { ArticleModule } from '../article/article.module'

@Module({
	imports: [
		SequelizeModule.forFeature([WritingProposal]),
		forwardRef(() => ProposalsGroupModule),
		ArticleModule,
	],
	controllers: [WritingProposalController],
	providers: [WritingProposalService],
	exports: [WritingProposalService]
})
export class WritingProposalModule {}
