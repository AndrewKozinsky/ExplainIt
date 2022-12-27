import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Res,
} from '@nestjs/common'
import { Response } from 'express'
import CreateWritingProposalDto from './dto/createWritingProposal.dto'
import WritingProposalRespType from './response/responseTypes'
import { WritingProposalService } from './writingProposal.service'
import HelperService from '../helper/helper.service'
import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'
import UpdateWritingProposalDto from './dto/updateWritingProposal.dto'

@Controller('writingProposal')
export class WritingProposalController {
	constructor(
		private readonly writingProposalService: WritingProposalService,
		private readonly proposalsGroupService: ProposalsGroupService,
		private readonly helperService: HelperService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() proposalDto: CreateWritingProposalDto,
		@Res({ passthrough: true }) res: Response
	): Promise<WritingProposalRespType.CreateOneWrap> {
		// Проверить существует ли группа предложений к которой делают предложение
		const isGroupExist = await this.proposalsGroupService.isExist(proposalDto.proposalsGroupId)

		if (!isGroupExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует группы предложений к которой создают предложение.'
			)
		}

		// Создать новое предложение
		const createdProposal = await this.writingProposalService.createOne(proposalDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ writingProposals: createdProposal }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() proposalDto: UpdateWritingProposalDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<WritingProposalRespType.UpdateOneWrap> {
		// Обновить предложение в БД
		const updatedProposal = await this.writingProposalService.updateOne(id, proposalDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedProposal) {
			return this.helperService.createSuccessResponse (
				{ writingProposals: updatedProposal }, HttpStatus.OK
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
	): Promise<WritingProposalRespType.DeleteWrap> {
		// Проверить существование предложения
		const thisProposal = await this.writingProposalService.getOne(id)

		if (!thisProposal) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}

		// Удалить предложение
		await this.writingProposalService.deleteOne(id)

		return this.helperService.createSuccessResponse (
			{ writingProposals: null }, HttpStatus.OK
		)
	}
}
