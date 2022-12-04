import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post, Res,
} from '@nestjs/common'
import CreateOralProposalDto from './dto/createOralProposal.dto'
import { OralProposalRespType } from './response/responseTypes'
import { OralProposalService } from './oralProposal.service'
import { HelperService } from '../helper/helper.service'
import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'
import { Response } from 'express'

@Controller('oralProposal')
export class OralProposalController {
	constructor(
		private readonly oralProposalService: OralProposalService,
		private readonly proposalsGroupService: ProposalsGroupService,
		private readonly helperService: HelperService
	) {}

	// @Get()
	// @HttpCode(HttpStatus.OK)
	/*async getAll(): Promise<ArticleRespType.GetAllWrap> {
		// Найти статью в БД
		const foundedArticles = await this.oralProposalService.getAll()

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse (
			{ articles: foundedArticles }, HttpStatus.OK
		)
	}*/

	// @Get(':id')
	// @HttpCode(HttpStatus.OK)
	/*async getOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.GetOneWrap> {
		// Найти статью в БД
		const foundArticle = await this.oralProposalService.getOne(id)

		if (foundArticle) {
			return this.helperService.createSuccessResponse (
				{ articles: foundArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)

			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}*/

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() proposalDto: CreateOralProposalDto,
		@Res({ passthrough: true }) res: Response
	): Promise<OralProposalRespType.CreateOneWrap> {
		// Проверить существует ли группа предложений к которой делают предложение
		const isGroupExist = await this.proposalsGroupService.isExist(proposalDto.proposalsGroupId)

		if (!isGroupExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует группы предложений к которой создают предложение.'
			)
		}

		// Создать новое предложение
		const createdArticle = await this.oralProposalService.createOne(proposalDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ articles: createdArticle }, HttpStatus.CREATED
		)
	}

	// @Patch(':id')
	// @HttpCode(HttpStatus.OK)
	/*async update(
		@Body() articleDto: UpdateOralProposalDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.UpdateOneWrap> {
		// Обновить статью в БД
		const updatedArticle = await this.oralProposalService.updateOne(id, articleDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedArticle) {
			return this.helperService.createSuccessResponse (
				{ articles: updatedArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}*/

	// @Delete(':id')
	// @HttpCode(HttpStatus.OK)
	/*async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ArticleRespType.DeleteOneWrap> {
		// Удалить статью
		const isDeleted = await this.oralProposalService.deleteOne(id)

		if (isDeleted) {
			return this.helperService.createSuccessResponse (
				{ articles: null }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Статья не найдена'
			)
		}
	}*/
}
