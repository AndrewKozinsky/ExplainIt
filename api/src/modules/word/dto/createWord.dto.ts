import { IsArray, IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import wordConstraints from '../model/word.constraints'


export default class CreateWordDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.rusWord.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.rusWord.maxLength) }
	)
	rusWord: string

	@IsOptional()
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.note.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.note.maxLength) }
	)
	note?: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		wordConstraints.engWord.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(wordConstraints.engWord.maxLength) }
	)
	engWord: string

	@IsOptional()
	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	wrongVerbs?: string[]

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		wordConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(wordConstraints.order.max) }
	)
	order: number

	@IsOptional()
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		wordConstraints.proposalId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(wordConstraints.proposalId.max) }
	)
	oralProposalId: number

	@IsOptional()
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		wordConstraints.proposalId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(wordConstraints.proposalId.max) }
	)
	writingProposalId: number
}
