import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength, MinLength } from 'class-validator'
import dtoErrorMessages from 'src/utils/dtoErrorMessages'
import articleConstraints from '../model/article.constraints'


export default class UpdateArticleDto {
    // @ApiProperty({ description: 'Название статьи' })
    @IsString({ message: dtoErrorMessages.mustBeString })
	@MinLength(
		articleConstraints.name.minLength,
		{ message: dtoErrorMessages.mustBeEqualOrGreater(articleConstraints.name.minLength) }
	)
	@MaxLength(
		articleConstraints.name.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(articleConstraints.name.maxLength) }
	)
	@IsOptional()
    name?: string

    // @ApiProperty({ description: 'Номер статьи (например: 7) или метка (например: Вводная глава)' })
    @IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		articleConstraints.chapter.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(articleConstraints.chapter.maxLength) }
	)
    @IsOptional()
    chapter?: string

    // @ApiProperty({ description: 'Опубликована ли глава', default: false })
    @IsBoolean({ message: dtoErrorMessages.mustBeBool })
    @IsOptional()
    published?: boolean

    // @ApiProperty({ description: 'Краткое описание статьи' })
    @IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		articleConstraints.summary.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(articleConstraints.summary.maxLength) }
	)
    @IsOptional()
    summary?: string

    // @ApiProperty({ description: 'Содержимое статьи. Разметка берётся из редактора и затем разбирается на компоненты' })
    @IsString({ message: dtoErrorMessages.mustBeString })
    @IsOptional()
    content?: string

    // @ApiProperty({ description: 'Порядковый номер статьи' })
    @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		articleConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(articleConstraints.order.max) }
	)
    @IsOptional()
    order?: number
}
