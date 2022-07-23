import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator'

export default class CreateArticleDto {
    // TODO Измени интерфейс с учётом кнопок сохранения данных.
    // TODO Разберись как сделать чтобы ошибки выбрасываемые Призмой клиенту приходили в приглядном виде
    // TODO Хочется чтобы был тип где указаны свойства модели, хранящейся в БД. И все DTO должны базироваться на этих данных. Я хочу сделать единый источник истины.
    // TODO Напиши сообщения об ошибках на русском. Заодно укажи пределы.
    @IsString({ message: 'Должно быть строковым значением' })
    name: string

    @IsString({ message: 'Должно быть строковым значением' })
    article_number: string

    @IsBoolean()
    @IsOptional()
    published?: boolean

    @IsString({ message: 'Должно быть строковым значением' })
    summary: string

    @IsString({ message: 'Должно быть строковым значением' })
    content: string

    @IsPositive({ message: 'Должно быть число' })
    order_number: number
}
