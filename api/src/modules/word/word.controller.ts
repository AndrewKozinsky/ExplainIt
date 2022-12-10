import {
	// Body,
	Controller,
	// Delete,
	// HttpCode,
	// HttpStatus,
	// Param,
	// ParseIntPipe,
	// 		Patch,
	// Post,
	// Res,
} from '@nestjs/common'
// import { Response } from 'express'
// import { WritingProposalService } from '../writingProposal/writingProposal.service'
// import CreateWordDto from './dto/createWord.dto'
// import { TranslateRespType } from './response/responseTypes'
// import { WordService } from './word.service'
// import { TranslateService } from './translate.service'
// import { HelperService } from '../helper/helper.service'
// import { ProposalsGroupService } from '../proposalsGroup/proposalsGroup.service'
// import UpdateWritingProposalDto from './dto/updateWritingProposal.dto'

@Controller('translate')
export class WordController {
	constructor(
		// private readonly writingProposalService: WritingProposalService,
		// private readonly translateService: WordService,
		// private readonly helperService: HelperService
	) {}

	// @Post()
	// @HttpCode(HttpStatus.CREATED)
	/*async create(
		@Body() translateDto: CreateWordDto,
		@Res({ passthrough: true }) res: Response
	): Promise<TranslateRespType.CreateOneWrap> {
		// Проверить существует ли предложение к которой делают перевод
		const isProposalExist = await this.writingProposalService.isExist(translateDto.proposalId)

		if (!isProposalExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует предложения, к которому создают перевод.'
			)
		}

		// Создать новое предложение
		const createdTranslate = await this.translateService.createOne(translateDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ translates: createdTranslate }, HttpStatus.CREATED
		)
	}*/

	// @Patch(':id')
	// @HttpCode(HttpStatus.OK)
	/*async update(
		@Body() proposalDto: UpdateWritingProposalDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<TranslateRespType.UpdateOneWrap> {
		// Обновить предложение в БД
		const updatedProposal = await this.writingProposalService.updateOne(id, proposalDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedProposal) {
			return this.helperService.createSuccessResponse (
				{ translates: updatedArticle }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Предложение не найдено'
			)
		}
	}*/

	// @Delete(':id')
	// @HttpCode(HttpStatus.OK)
	/*async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<TranslateRespType.DeleteWrap> {
		// Проверить существование перевода
		const thisTranslate = await this.translateService.getOne(id)

		if (!thisTranslate) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Перевод не найден'
			)
		}

		// Удалить перевод
		await this.writingProposalService.deleteOne(id)

		return this.helperService.createSuccessResponse (
			{ translates: null }, HttpStatus.OK
		)
	}*/
}
