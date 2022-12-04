import { IsPositive, IsString, Max, Validate } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import groupConstraints from '../model/group.constraints'
import { OneOfConstraint } from '../../../utils/customClassValidators'


export default class CreateGroupDto {
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		groupConstraints.articleId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(groupConstraints.order.max) }
	)
	articleId: number

	@IsString({ message: dtoErrorMessages.mustBeString })
	@Validate(
		OneOfConstraint,
		['oral', 'writing'],
		{ message: dtoErrorMessages.oneOf(['oral', 'writing']) })
	type: string // Тип упражнений: oral или writing

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		groupConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(groupConstraints.order.max) }
	)
	order: number
}
