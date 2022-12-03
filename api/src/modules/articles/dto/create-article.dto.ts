// import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'
import articleConstraints from '../model/article.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'


export default class CreateArticleDto {
    // @ApiProperty({ description: 'Название статьи' })
    @IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		articleConstraints.name.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(articleConstraints.name.maxLength) }
	)
    name: string

    // @ApiProperty({ description: 'Номер статьи (например: 7) или метка (например: Вводная глава)' })
    @IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		articleConstraints.chapter.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(articleConstraints.chapter.maxLength) }
	)
	chapter: string

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
	summary: string

    // @ApiProperty({ description: 'Содержимое статьи. Разметка берётся из редактора и затем разбирается на компоненты' })
    @IsString({ message: dtoErrorMessages.mustBeString })
    content: string

    // @ApiProperty({ description: 'Порядковый номер статьи' })
    @IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		articleConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(articleConstraints.order.max) }
	)
	order: number
}
