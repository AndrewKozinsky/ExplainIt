import { IsArray, IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import writingProposalConstraints from '../model/writingProposal.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'


export default class CreateWritingProposalDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		writingProposalConstraints.rusProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.rusProposal.maxLength) }
	)
	rusProposal: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		writingProposalConstraints.note.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.note.maxLength) }
	)
	@IsOptional()
	note?: string

	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	badTranslations: string[]

	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	rawTranslations: string[]

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	published?: boolean

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		writingProposalConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.order.max) }
	)
	order: number

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		writingProposalConstraints.proposalsGroupId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.proposalsGroupId.max) }
	)
	proposalsGroupId: number
}
