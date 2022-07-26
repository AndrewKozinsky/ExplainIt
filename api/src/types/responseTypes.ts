// Типы данных отправляемых сервером
import { HttpStatus } from '@nestjs/common'
import { Article } from '../../prisma/client'

export namespace ResponseObjType {
	// Ошибка сервера
	export type Error = {
		status: 'error',
		statusCode: 500,
		message: string // Текст сообщения об ошибке
	}

	// Ошибка пользователя
	export type Fail = {
		status: 'fail'
		statusCode: HttpStatus
		message?: string // Главное сообщение об ошибке. Например: «Доступ запрещён»
		fieldsErrors?: Errors // Объект с названиями свойства и массивом ошибок в его значении. Это для ошибок при отравке данных в теле запроса.
	}

	export type ErrorsGroup = {
		message?: string
		fieldsErrors?: Errors
	}
	
	export type Errors = Record<string, string[]>

	// Успешный запрос
	export type Success<T> = {
		status: 'success',
		statusCode: HttpStatus,
		data: T
	}
}


/**
 * Пространство имён с типами данных возвращаемыми методами ArticlesController
 */
export namespace ArticleRespType {
	export type Generic = { articles: Article[] }
	export type SuccessReturn = Promise<ResponseObjType.Success<Generic>>
	export type SuccessAndFailReturn = Promise<ResponseObjType.Success<Generic> | ResponseObjType.Fail>
}
