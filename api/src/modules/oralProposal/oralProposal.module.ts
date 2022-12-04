import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { OralProposalController } from './oralProposal.controller'
import { OralProposalService } from './oralProposal.service'
import { OralProposal } from './model/oralProposal.model'
import { ProposalsGroupModule } from '../proposalsGroup/proposalsGroup.module'

@Module({
	imports: [
		SequelizeModule.forFeature([OralProposal]),
		ProposalsGroupModule
	],
	controllers: [OralProposalController],
	providers: [OralProposalService],
})
export class OralProposalModule {}
