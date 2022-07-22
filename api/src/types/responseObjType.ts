// Типы данных отправляемых сервером
import { HttpStatus } from '@nestjs/common'

namespace ResponseObjType {
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
		errors: Errors // Объект с названиями свойства и массивом ошибок в его значении. Это для ошибок при отравке данных в теле запроса.
	}

	export type Errors = Record<string, string[]>

	// Успешный запрос
	export type Success<T> = {
		status: 'success',
		statusCode: HttpStatus,
		data: T
	}
}

export default ResponseObjType
