import { Response } from 'express'
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { GeneralRespType } from 'src/types/generalResponse'

/** Фильтр обрабатывает HTTP-исключения и стандартные (неожиданные) ошибки. */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		// Режим работы API
		const workMode = process.env.NODE_ENV

		// Контекст запроса и объект ответа
		const ctx = host.switchToHttp()
		const response = ctx.getResponse<Response>()

		// Если выброшено контролируемое исключение
		if (exception instanceof HttpException) {
			const statusCode = exception.getStatus()

			const respObj: GeneralRespType.Fail = {
				status: 'fail',
				message: exception.message,
				statusCode,
				...exception.getResponse() as GeneralRespType.ErrorsGroup
			}

			response.json(respObj)
		}
		// Если возникла неожиданная ошибка
		else if (exception instanceof Error) {
			response.json(
				{
					status: 'error',
					statusCode: 500,
					message: ['development', 'test'].includes(workMode)
						? exception.message
						: 'Ошибка сервера.'
				} as GeneralRespType.Error
			)
		}
	}
}
