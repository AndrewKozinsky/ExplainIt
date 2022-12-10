// import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
// import dtoErrorMessages from 'src/utils/dtoErrorMessages'
// import wordConstraints from '../model/word.constraints'


export default class UpdateWordDto {
	// @IsString({ message: dtoErrorMessages.mustBeString })
	// @MaxLength(
	// 	writingProposalConstraints.rusProposal.maxLength,
	// 	{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.rusProposal.maxLength) }
	// )
	// @IsOptional()
	// rusProposal?: string

	// @IsString({ message: dtoErrorMessages.mustBeString })
	// @MaxLength(
	// 	writingProposalConstraints.note.maxLength,
	// 	{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.note.maxLength) }
	// )
	// @IsOptional()
	// note?: string

	// @IsString({ message: dtoErrorMessages.mustBeString })
	// @MaxLength(
	// 	writingProposalConstraints.engProposal.maxLength,
	// 	{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.engProposal.maxLength) }
	// )
	// @IsOptional()
	// engProposal?: string

	// @IsBoolean({ message: dtoErrorMessages.mustBeBool })
	// @IsOptional()
	// published?: boolean

	// @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	// @Max(
	// 	writingProposalConstraints.order.max,
	// 	{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.order.max) }
	// )
	// @IsOptional()
	// order?: number

	// @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	// @Max(
	// 	writingProposalConstraints.proposalsGroupId.max,
	// 	{ message: dtoErrorMessages.shouldNotBeMore(writingProposalConstraints.proposalsGroupId.max) }
	// )
	// @IsOptional()
	// proposalsGroupId?: number
}
