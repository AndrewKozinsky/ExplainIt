import { IsArray, IsBoolean, IsOptional, IsPositive, IsString, Max } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import translateConstraints from '../model/translate.constraints'


export default class CreateTranslateDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@IsOptional()
	analysis: string

	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	@IsOptional()
	translations: string[]

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	correct?: boolean

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	checked?: boolean

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		translateConstraints.proposalId.max,
		{ message: dtoErrorMessages.shouldNotBeMore(translateConstraints.proposalId.max) }
	)
	proposalId: number
}
