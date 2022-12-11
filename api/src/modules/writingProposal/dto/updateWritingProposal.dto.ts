import { IsArray, IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import dtoErrorMessages from 'src/utils/dtoErrorMessages'
import writingProposalConstraints from '../model/writingProposal.constraints'

export default class UpdateWritingProposalDto {
	@IsOptional()
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		writingProposalConstraints.rusProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.rusProposal.maxLength) }
	)
	rusProposal?: string

	@IsOptional()
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		writingProposalConstraints.note.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.note.maxLength) }
	)
	note?: string

	@IsOptional()
	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	badTranslations?: string[]

	@IsOptional()
	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	rawTranslations?: string[]

	@IsOptional()
	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	published?: boolean

	@IsOptional()
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		writingProposalConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.order.max) }
	)
	order?: number

	@IsOptional()
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		writingProposalConstraints.proposalsGroupId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.proposalsGroupId.max) }
	)
	proposalsGroupId?: number
}
