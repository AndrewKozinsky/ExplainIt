import { IsPositive, IsString, Max, MaxLength, Validate } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import exercisesGroupConstraints from '../model/exercisesGroup.constraints'
import { OneOfConstraint } from '../../../utils/customClassValidators'


export default class CreateExercisesGroupDto {
	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		exercisesGroupConstraints.article_id.max,
		{ message: dtoErrorMessages.shouldNotBeMore(exercisesGroupConstraints.order.max) }
	)
	article_id: number

	@IsString({ message: dtoErrorMessages.mustBeString })
	@Validate(
		OneOfConstraint,
		['oral', 'writing'],
		{ message: dtoErrorMessages.oneOf(['oral', 'writing']) })
	type: string // Тип упражнений (oral | writing)

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		exercisesGroupConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(exercisesGroupConstraints.order.max) }
	)
	order: number
}
