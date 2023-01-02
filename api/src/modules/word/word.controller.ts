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
import { WritingProposalService } from '../writingProposal/writingProposal.service'
import CreateWordDto from './dto/createWord.dto'
import WordRespType from './response/responseTypes'
import { WordService } from './word.service'
import HelperService from '../helper/helper.service'
import UpdateWordDto from './dto/updateWord.dto'
// import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'
// import UpdateWritingProposalDto from './dto/updateWritingProposal.dto'

@Controller('word')
export class WordController {
	constructor(
		private readonly writingProposalService: WritingProposalService,
		private readonly wordService: WordService,
		private readonly helperService: HelperService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() createWordDto: CreateWordDto,
		@Res({ passthrough: true }) res: Response
	): Promise<WordRespType.CreateOneWrap> {

		// Проверить существует ли предложение к которой делают перевод
		const isOralProposalExist =
			await this.writingProposalService.isExist(createWordDto.oralProposalId || 0)
		const isWritingProposalExist =
			await this.writingProposalService.isExist(createWordDto.writingProposalId || 0)

		if (!isOralProposalExist && !isWritingProposalExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует предложения, к которому создают перевод.'
			)
		}

		// Создать новое слово
		const createdWord = await this.wordService.createOne(createWordDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ words: createdWord }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() wordDto: UpdateWordDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<WordRespType.UpdateOneWrap> {
		// Обновить слово в БД
		const updatedWord = await this.wordService.updateOne(id, wordDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedWord) {
			return this.helperService.createSuccessResponse (
				{ words: updatedWord }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Слово не найдено'
			)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<WordRespType.DeleteWrap> {
		// Проверить существование слова
		const thisWord = await this.wordService.getOne(id)

		if (!thisWord) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Удаляемое слово не найдено'
			)
		}

		// Удалить слово
		await this.wordService.deleteOne(id)

		return this.helperService.createSuccessResponse (
			{ words: null }, HttpStatus.OK
		)
	}
}
