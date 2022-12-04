import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { HelperService } from '../helper/helper.service'
import { ProposalsGroupService } from './proposalsGroup.service'
import CreateGroupDto from './dto/createGroup.dto'
import { ArticleService } from '../article/article.service'
import { ProposalsGroupRespType } from './response/responseTypes'
import UpdateGroupDto from './dto/updateGroup.dto'

@Controller('proposalsGroup')
export class ProposalsGroupController {
	constructor(
		private readonly proposalsGroupService: ProposalsGroupService,
		private readonly articlesService: ArticleService,
		private readonly helperService: HelperService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() articleDto: CreateGroupDto,
		@Res({ passthrough: true }) res: Response
	): Promise<ProposalsGroupRespType.CreateOneWrap> {
		// Проверить существует ли статья к которой делают группу упражнений
		const isArticleExist = await this.articlesService.isExist(articleDto.articleId)

		if (!isArticleExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует статьи к которой создают группу упражнений.'
			)
		}

		// Создать новую группу упражнений в БД
		const createdGroup = await this.proposalsGroupService.createOne(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ proposalsGroups: createdGroup }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() groupDto: UpdateGroupDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ProposalsGroupRespType.UpdateOneWrap> {
		// Обновить статью в БД
		const updatedGroup = await this.proposalsGroupService.updateOne(id, groupDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedGroup) {
			return this.helperService.createSuccessResponse (
				{ proposalsGroups: updatedGroup }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Группа упражнений не найдена'
			)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ProposalsGroupRespType.DeleteOneWrap> {
		// Удалить группу упражнений
		const isDeleted = await this.proposalsGroupService.deleteOne(id)

		if (isDeleted) {
			return this.helperService.createSuccessResponse (
				{ proposalsGroups: null }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Группа упражнений не найдена'
			)
		}
	}
}
