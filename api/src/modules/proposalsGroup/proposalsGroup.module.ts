import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProposalsGroupService } from './proposalsGroup.service'
import { ProposalsGroupController } from './proposalsGroup.controller'
import { ProposalsGroup } from './model/proposalsGroup.model'
import { ArticleModule } from '../article/article.module'

@Module({
	imports: [
		SequelizeModule.forFeature([ProposalsGroup]),
		ArticleModule
	],
	providers: [ProposalsGroupService],
	controllers: [ProposalsGroupController],
	exports: [ProposalsGroupService]
})
export class ProposalsGroupModule {}