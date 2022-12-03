import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

/** Проверяет входит ли переданное значение в массив допустимых значений
 *  Массив возможных значений передаётся вторым аргументом в @Validate()
 * */
@ValidatorConstraint({ async: false })
export class OneOfConstraint implements ValidatorConstraintInterface {
	validate(value: any, args: ValidationArguments) {
		const rightValues: string[] = args.constraints
		return rightValues.includes(value)
	}
}


const gg = {
	targetName: 'CreateExercisesGroupDto',
	property: 'type',
	object: {
		article_id: 1,
		type: '12 глава',
		order: 12
	},
	value: '12 глава',
	constraints: [ 'oral', 'writing' ]
}
