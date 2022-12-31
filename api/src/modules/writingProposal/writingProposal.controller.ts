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
import RawTranslateDto from './dto/rawTranslate.dto'

@Controller('writingProposal')
export class WritingProposalController {
	constructor(
		private readonly writingProposalService: WritingProposalService,
		private readonly proposalsGroupService: ProposalsGroupService,
		private readonly helperService: HelperService
	) {}

	// Создание письменного предложения
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

	// Обновление письменного предложения
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

	// Удаление письменного предложения
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

	// Добавление необработанного перевода в массив необработанных переводов письменного предложения
	@Post(':id/rawProposal')
	@HttpCode(HttpStatus.OK)
	async addRawProposal(
		@Body() rawProposalDto: RawTranslateDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<WritingProposalRespType.UpdateOneWrap> {
		// Получить письменное предложение
		const thisProposal = await this.writingProposalService.getOne(id)

		if (!thisProposal) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}

		const newRowProposals = thisProposal.rawTranslations
		newRowProposals.push(rawProposalDto.text)

		// Обновить предложение в БД
		const updatedProposal = await this.writingProposalService.updateOne(
			id, { rawTranslations: newRowProposals }
		)

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

	// Удаление необработанного перевода из массива необработанных переводов письменного предложения
	@Delete(':id/rawProposal')
	@HttpCode(HttpStatus.OK)
	async removeRawProposal(
		@Body() rawProposalDto: RawTranslateDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<WritingProposalRespType.UpdateOneWrap> {
		// Получить письменное предложение
		const thisProposal = await this.writingProposalService.getOne(id)

		if (!thisProposal) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}

		const newRowProposals = thisProposal.rawTranslations.filter(proposal => {
			return proposal !== rawProposalDto.text
		})

		// Обновить предложение в БД
		const updatedProposal = await this.writingProposalService.updateOne(
			id, { rawTranslations: newRowProposals }
		)

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
}
