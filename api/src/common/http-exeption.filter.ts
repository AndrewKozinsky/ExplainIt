import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import ResponseObjType from '../types/responseObjType'

/**
 * Фильтр обрабатывает HTTP-исключения и стандартные (неожиданные) ошибки.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		// Режим работы API
		const workMode = process.env.WORK_MODE

		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		// Если выброшено контролируемое исключение
		if (exception instanceof HttpException) {
			const statusCode = exception.getStatus()

			response.json({
				status: 'fail',
				statusCode,
				errors: exception.getResponse() // Объект с названиями свойств и массивом ошибок
			} as ResponseObjType.Fail)
		}
		// Если возникла неожиданная ошибка
		else if (exception instanceof Error) {
			if (workMode === 'dev') {
				response.json({
					status: 'error',
					statusCode: 500,
					error: exception.message
				} as ResponseObjType.Error)
			}
			else if (workMode === 'prod') {
				response.json({
					status: 'error',
					statusCode: 500,
					error: 'A server error occurred'
				} as ResponseObjType.Error)
			}

		}
	}
}
