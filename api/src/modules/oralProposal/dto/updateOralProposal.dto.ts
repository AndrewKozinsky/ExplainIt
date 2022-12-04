// import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator'
// import dtoErrorMessages from 'src/utils/dtoErrorMessages'
// import oralProposalConstraints from '../model/oralProposal.constraints'


export default class UpdateOralProposalDto {
	// @IsString({ message: dtoErrorMessages.mustBeString })
	/*@MinLength(
		oralProposalConstraints.name.minLength,
		{ message: dtoErrorMessages.mustBeEqualOrGreater(oralProposalConstraints.name.minLength) }
	)*/
	/*@MaxLength(
		oralProposalConstraints.name.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.name.maxLength) }
	)*/
	// @IsOptional()
	// name?: string

	// @IsString({ message: dtoErrorMessages.mustBeString })
	/*@MaxLength(
		oralProposalConstraints.chapter.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.chapter.maxLength) }
	)*/
	// @IsOptional()
	// chapter?: string

	// @IsBoolean({ message: dtoErrorMessages.mustBeBool })
	// @IsOptional()
	// published?: boolean

	// @IsString({ message: dtoErrorMessages.mustBeString })
	/*@MaxLength(
		oralProposalConstraints.summary.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.summary.maxLength) }
	)*/
	// @IsOptional()
	// summary?: string

	// @IsString({ message: dtoErrorMessages.mustBeString })
	// @IsOptional()
	// content?: string

	// @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	/*@Max(
		oralProposalConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(oralProposalConstraints.order.max) }
	)*/
	// @IsOptional()
	// order?: number
}
