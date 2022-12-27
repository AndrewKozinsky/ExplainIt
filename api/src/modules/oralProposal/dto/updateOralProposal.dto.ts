import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import oralProposalConstraints from '../model/oralProposal.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'

class UpdateOralProposalDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		oralProposalConstraints.rusProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(oralProposalConstraints.rusProposal.maxLength) }
	)
	@IsOptional()
	rusProposal?: string

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
	@IsOptional()
	engProposal?: string

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	published?: boolean

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		oralProposalConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(oralProposalConstraints.order.max) }
	)
	@IsOptional()
	order?: number

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		oralProposalConstraints.proposalsGroupId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(oralProposalConstraints.proposalsGroupId.max) }
	)
	@IsOptional()
	proposalsGroupId?: number
}

export default UpdateOralProposalDto
