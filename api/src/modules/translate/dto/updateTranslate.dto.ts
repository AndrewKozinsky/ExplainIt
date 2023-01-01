import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'

export default class UpdateTranslateDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@IsOptional()
	analysis?: string

	@IsArray({ message: dtoErrorMessages.mustBeStringsArray })
	@IsString({ each: true, message: dtoErrorMessages.mustBeStringsArray })
	@IsOptional()
	translations?: string[]

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	correct?: boolean

	@IsBoolean({ message: dtoErrorMessages.mustBeBool })
	@IsOptional()
	checked?: boolean
}
