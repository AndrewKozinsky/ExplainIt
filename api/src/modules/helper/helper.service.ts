import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ValidationError } from 'sequelize'
import { GeneralRespType } from '../../types/generalResponse'

/** Класс с различными методами используемые на всём приложении */
@Injectable()
export class HelperService {

	/**
	 * Метод запускает функцию из ОРМ для взаимодействия с БД.
	 * При появлении ошибки будет выброшено исключение, которое будет обработано.
	 * @param {Function} queryFn — запускаемая функция
	 */
	async runQuery<T>(queryFn: () => Promise<T>): Promise<T | never> {
		try {
			return await queryFn()
		}
		catch(validationError) {
			if (validationError instanceof ValidationError) {

				const errorsCollector: GeneralRespType.Errors = {}

				validationError.errors.forEach(error => {
					if (!error.path || !error.type) return

					if (error.path && !errorsCollector[error.path]) {
						errorsCollector[error.path] = []
					}

					if (error.type.toLowerCase() == 'notnull violation') {
						errorsCollector[error.path].push('Требуется передать значение.')
						// 'Значение поля должно быть уникальным.'
						// 'Сущность не найдена.'
					}
					else {
						errorsCollector[error.path].push('Необработанная ошибка. Требуется актуализировать список.')
					}
				})

				if (Object.keys(errorsCollector).length) {
					throw new HttpException({
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: errorsCollector
					}, HttpStatus.BAD_REQUEST)
				}
			}

			throw new Error('Неизвестная ошибка сервера.')
		}
	}

	/**
	 * Функция формирует объект успешного ответа клиенту
	 * @param {Object} data — данные клиенту
	 * @param {Number} statusCode — код статуса
	 */
	createSuccessResponse<T>(data: T, statusCode: HttpStatus): GeneralRespType.Success<T> {
		return {
			status: 'success',
			statusCode,
			data
		}
	}

	/**
	 * Функция формирует объект ошибочного ответа клиенту
	 * @param {Number} statusCode — код статуса
	 * @param {String} message — общий текст ошибки
	 */
	createFailResponse(statusCode: HttpStatus, message?: string, ): GeneralRespType.Fail {
		return {
			status: 'fail',
			statusCode,
			message
		}
	}
}
