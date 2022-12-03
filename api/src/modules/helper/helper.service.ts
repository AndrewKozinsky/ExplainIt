import { HttpStatus, Injectable } from '@nestjs/common'
import { ValidationError } from 'sequelize'
import { ResponseObjType } from '../../types/responseTypes'
import { GeneralHttpException } from '../../common/general-http-error'

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

				const errorsCollector: ResponseObjType.Errors = {}

				// console.log('================')
				// console.log(err.errors)
				// console.log('================')

				validationError.errors.forEach(error => {
					if (!error) return

					//@ts-ignore
					if (!errorsCollector[error.path]) {
						//@ts-ignore
						errorsCollector[error.path] = []
					}

					/*if (error.type == 'notNull Violation') {
						errorsCollector[error.path].push('Значение поля должно быть уникальным.')
					}*/
				})

				if (Object.keys(errorsCollector).length) {
					throw new GeneralHttpException({
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: errorsCollector
					}, HttpStatus.BAD_REQUEST)
				}




				/*if (err.code === 'P2002' && err.meta) {
					throw new GeneralHttpException({
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: {
							[err.meta.target as string]: ['Значение поля должно быть уникальным.']
						}
					}, HttpStatus.BAD_REQUEST)
				}*/
				/*else if (err.code === 'P2025' && err.meta) {
					throw new GeneralHttpException({
						message: 'Сущность не найдена.'
					}, HttpStatus.BAD_REQUEST)
				}*/
				/*else {
					throw new GeneralHttpException({
						message: 'Необработанная ошибка. Требуется актуализировать список.'
					}, HttpStatus.BAD_REQUEST)
				}*/
			}

			console.log('Произошла ошибка')
			throw new Error('Неизвестная ошибка сервера.')
		}
	}

	/**
	 * Функция формирует объект успешного ответа клиенту
	 * @param {Object} data — данные клиенту
	 * @param {Number} statusCode — код статуса
	 */
	createSuccessResponse<T>(data: T, statusCode: HttpStatus): ResponseObjType.Success<T> {
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
	/*createFailResponse(statusCode: HttpStatus, message?: string, ): ResponseObjType.Fail {
		return {
			status: 'fail',
			statusCode,
			message
		}
	}*/
}
