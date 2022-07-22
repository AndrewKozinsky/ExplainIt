import { IsNumber, IsString } from 'class-validator'

export default class CreateArticleDto {
    // TODO Хочется чтобы был тип где указаны свойства модели, хранящейся в БД. И все DTO должны базироваться на этих данных. Я хочу сделать единый источник истины.
    // TODO Напиши сообщения об ошибках на русском. Заодно укажи пределы.
    @IsString()
    name: string

    @IsString()
    article_number: string

    @IsString()
    summary: string

    @IsString()
    content: string

    @IsNumber()
    order_number: number
}
