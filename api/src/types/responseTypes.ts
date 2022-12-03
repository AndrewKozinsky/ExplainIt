import { HttpStatus } from '@nestjs/common'
import { Article } from '../modules/articles/article.model'

// Типы данных отправляемых сервером
export namespace ResponseObjType {
	// Ошибка сервера
	/*export type Error = {
		status: 'error',
		statusCode: 500,
		message: string // Текст сообщения об ошибке
	}*/

	// Ошибка пользователя
	/*export type Fail = {
		status: 'fail'
		statusCode: HttpStatus
		message?: string // Главное сообщение об ошибке. Например: «Доступ запрещён»
		fieldsErrors?: Errors // Объект с названиями свойства и массивом ошибок в его значении. Это для ошибок при отправке данных в теле запроса.
	}*/

	export type ErrorsGroup = {
		message?: string
		fieldsErrors?: Errors
	}

	export type Errors = Record<string, string[]>

	// Успешный ответ
	export type Success<T> = {
		status: 'success',
		statusCode: HttpStatus,
		data: T
	}
}


/** Пространство имён с типами данных возвращаемыми методами ArticlesController */
export namespace ArticleRespType {
	// Статья с сокращённым набором данных для формирования списка статей
	export type ArticleItem = Pick<Article, 'id' | 'name' | 'published' | 'order'>

	export type Payload<T> = { articles: T }
	export type SuccessReturn<T> = Promise<ResponseObjType.Success<Payload<T>>>
	// export type SuccessOrFailReturn<T> = Promise<ResponseObjType.Success<Payload<T>> | ResponseObjType.Fail>
}
