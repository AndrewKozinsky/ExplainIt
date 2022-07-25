import { IsBoolean, IsOptional, IsPositive, IsString, Max, MaxLength } from 'class-validator'


export default class UpdateArticleDto {
    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255)
    @IsOptional()
    name?: string

    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(100)
    @IsOptional()
    article_number?: string

    @IsBoolean({ message: 'Должно быть булевым значением' })
    @IsOptional()
    published?: boolean

    @IsString({ message: 'Должно быть строковым значением' })
    @MaxLength(255)
    @IsOptional()
    summary?: string

    @IsString({ message: 'Должно быть строковым значением' })
    @IsOptional()
    content?: string

    @IsPositive({ message: 'Должно быть число' })
    @Max(65535, { message: 'Значение не должно быть больше 65 535' })
    @IsOptional()
    order_number?: number
}
