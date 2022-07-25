import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'


export default class CreateArticleDto {
    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255, { message: 'Значение должно быть короче или равно 255 символам' })
    name: string

    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(100, { message: 'Значение должно быть короче или равно 100 символам' })
    article_number: string

    @IsBoolean({ message: 'Должно быть булевым значением' })
    @IsOptional()
    published?: boolean

    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255, { message: 'Значение должно быть короче или равно 255 символам' })
    summary: string

    @IsString({ message: 'Должно быть строковым значением' })
    content: string

    @IsPositive({ message: 'Должно быть число' })
    @Max(65535, { message: 'Значение не должно быть больше 65 535' })
    order_number: number
}
