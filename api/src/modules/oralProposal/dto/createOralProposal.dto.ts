// import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
// import oralProposalConstraints from '../model/oralProposal.constraints'
// import dtoErrorMessages from '../../../utils/dtoErrorMessages'


/*export default class CreateOralProposalDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		oralProposalConstraints.rusProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.rusProposal.maxLength) }
	)
	rusProposal: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		oralProposalConstraints.note.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.note.maxLength) }
	)
	@IsOptional()
	note?: string

	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		oralProposalConstraints.engProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.engProposal.maxLength) }
	)
	engProposal: string

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	published?: boolean

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		oralProposalConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(oralProposalConstraints.order.max) }
	)
	order: number

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		oralProposalConstraints.proposalsGroupId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(oralProposalConstraints.proposalsGroupId.max) }
	)
	proposalsGroupId: number
}*/
