import { IsBoolean, IsOptional, IsPositive, IsString, Max, Validate } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import groupConstraints from '../model/group.constraints'
import { OneOfConstraint } from '../../../utils/customClassValidators'


export default class UpdateGroupDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@Validate(
		OneOfConstraint,
		['oral', 'writing'],
		{ message: dtoErrorMessages.oneOf(['oral', 'writing']) })
	@IsOptional()
	type?: string // Тип упражнений: oral или writing

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
