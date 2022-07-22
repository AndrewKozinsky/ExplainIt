// Типы данных отправляемых сервером
import { HttpStatus } from '@nestjs/common'

namespace ResponseObjType {
	// Ошибка сервера
	export type Error = {
		status: 'error',
		statusCode: 500,
		error: string // Текст сообщения об ошибке
	}

	// Ошибка пользователя
	export type Fail = {
		status: 'fail',
		statusCode: HttpStatus,
		errors: Errors // Массив сообщений с названием свойства и массивом ошибок в его значении
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
