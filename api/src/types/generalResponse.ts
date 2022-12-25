import { HttpStatus } from '@nestjs/common'

// Типы данных отправляемых сервером
export namespace GeneralRespType {
	// Успешный ответ
	export type Success<T> = {
		status: 'success',
		statusCode: HttpStatus,
		data: T
	}

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
		message: string // Главное сообщение об ошибке. Например: «Доступ запрещён»
		fieldsErrors?: Errors // Объект с названиями свойства и массивом ошибок в его значении. Это для ошибок при отправке данных в теле запроса.
	}

	export type ErrorsGroup = {
		message?: string
		fieldsErrors?: Errors
	}

	export type Errors = Record<string, string[]>
}
