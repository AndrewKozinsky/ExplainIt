import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post, Res,
} from '@nestjs/common'
import CreateOralProposalDto from './dto/createOralProposal.dto'
import { OralProposalRespType } from './response/responseTypes'
import { OralProposalService } from './oralProposal.service'
import { HelperService } from '../helper/helper.service'
import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'
import { Response } from 'express'
import UpdateOralProposalDto from './dto/updateOralProposal.dto'

@Controller('oralProposal')
export class OralProposalController {
	constructor(
		private readonly oralProposalService: OralProposalService,
		private readonly proposalsGroupService: ProposalsGroupService,
		private readonly helperService: HelperService
	) {}

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
			{ oralProposals: createdArticle }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() proposalDto: UpdateOralProposalDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<OralProposalRespType.UpdateOneWrap> {
		// Обновить предложение в БД
		const updatedArticle = await this.oralProposalService.updateOne(id, proposalDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedArticle) {
			return this.helperService.createSuccessResponse (
				{ oralProposals: updatedArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<OralProposalRespType.DeleteWrap> {
		// Проверить существование предложения
		const thisProposal = await this.oralProposalService.getOne(id)

		if (!thisProposal) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}

		// Удалить предложение
		await this.oralProposalService.deleteOne(id)

		return this.helperService.createSuccessResponse (
			{ oralProposals: null }, HttpStatus.OK
		)
	}
}
