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
