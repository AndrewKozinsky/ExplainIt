import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'


export default class CreateArticleDto {
    @ApiProperty({ description: 'Название статьи' })
    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255, { message: 'Значение должно быть короче или равно 255 символам' })
    name: string

    @ApiProperty({ description: 'Номер статьи (например: 7) или метка (например: Вводная глава)' })
    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
    label: string

    @ApiProperty({ description: 'Опубликована ли глава', default: false })
    @IsBoolean({ message: 'Должно быть булевым значением' })
    @IsOptional()
    published?: boolean

    @ApiProperty({ description: 'Краткое описание статьи' })
    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255, { message: 'Значение должно быть короче или равно 255 символам' })
    summary: string

    @ApiProperty({ description: 'Содержимое статьи. Разметка берётся из редактора и затем разбирается на компоненты' })
    @IsString({ message: 'Должно быть строковым значением' })
    content: string

    @ApiProperty({ description: 'Порядковый номер статьи' })
    @IsPositive({ message: 'Должно быть число' })
    @Max(65535, { message: 'Значение не должно быть больше 65 535' })
    order: number
}
