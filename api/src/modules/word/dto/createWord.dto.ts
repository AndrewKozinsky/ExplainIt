// import { IsArray, IsBoolean, IsOptional, IsPositive, IsString, Max } from 'class-validator'
// import dtoErrorMessages from '../../../utils/dtoErrorMessages'
// import groupConstraints from '../../proposalsGroup/model/group.constraints'


export default class CreateWordDto {
	// @IsString({ message: dtoErrorMessages.mustBeString })
	// @IsOptional()
	// analysis: string

	// @IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	// @IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	// @IsOptional()
	// translations: string[]

	// @IsBoolean({ message: dtoErrorMessages.mustBeBool })
	// @IsOptional()
	// correct?: boolean

	// @IsBoolean({ message: dtoErrorMessages.mustBeBool })
	// @IsOptional()
	// checked?: boolean

	// @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	// @Max(
	// 	groupConstraints.exerciseId.max,
	// 	{ message: dtoErrorMessages.shouldNotBeMore(groupConstraints.exerciseId.max) }
	// )
	// proposalId: number
}
