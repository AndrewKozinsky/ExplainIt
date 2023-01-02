import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import wordConstraints from '../model/word.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'


export default class UpdateWordDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.rusWord.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.rusWord.maxLength) }
	)
	@IsOptional()
	rusWord?: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.note.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.note.maxLength) }
	)
	@IsOptional()
	note?: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.engWord.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.engWord.maxLength) }
	)
	@IsOptional()
	engWord?: string

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		wordConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(wordConstraints.order.max) }
	)
	@IsOptional()
	order?: number
}
