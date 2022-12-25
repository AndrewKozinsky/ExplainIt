import { IsBoolean, IsOptional, IsPositive, IsString, Max, Validate } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import groupConstraints from '../model/group.constraints'
import { OneOfConstraint } from '../../../utils/customClassValidators'
import ModelTypes from '../../../types/modelTypes'


export default class UpdateGroupDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@Validate(
		OneOfConstraint,
		[ModelTypes.ProposalGroup.GroupTypeEnum.ORAL, ModelTypes.ProposalGroup.GroupTypeEnum.WRITING],
		{ message: dtoErrorMessages.oneOf([ModelTypes.ProposalGroup.GroupTypeEnum.ORAL, ModelTypes.ProposalGroup.GroupTypeEnum.WRITING]) })
	@IsOptional()
	type?: ModelTypes.ProposalGroup.GroupType // Тип упражнений: oral или writing

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		groupConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(groupConstraints.order.max) }
	)
	@IsOptional()
	order?: number

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	payAtn?: boolean // Нужно ли обратить внимание на эту группу предложений
}
