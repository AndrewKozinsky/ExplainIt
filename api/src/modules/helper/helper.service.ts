import { HttpStatus, Injectable } from '@nestjs/common'
import { ResponseObjType } from '../../types/responseTypes'
import { GeneralHttpException } from '../../common/general-http-error'
import { PrismaClientKnownRequestError } from '../../../prisma/client/runtime'
import { PrismaClientKnownRequestError as PrismaClientKnownRequestErrorTest } from '../../../prisma_test/client/runtime'

/**
 * Класс с различными методами используемые на всём приложении
 */
@Injectable()
export class HelperService {
	
	/**
	 * Метод запускает функцию с методом Призмы. Например, для записи сущности в таблицу БД.
	 * При появлении ошибки будет выброшено исключение.
	 * @param queryFn
	 */
	async runQuery<T>(queryFn: () => Promise<T>): Promise<T | never> {
		try {
			return await queryFn()
		}
		catch(err) {
			// Типы ошибок Призмы описаны в prisma.io/docs/reference/api-reference/error-reference
			if (err instanceof PrismaClientKnownRequestError || err instanceof PrismaClientKnownRequestErrorTest) {
				
				if (err.code === 'P2002' && err.meta) {
					throw new GeneralHttpException({
						message: 'Поля тела запроса содержат ошибки',
						fieldsErrors: {
							[err.meta.target as string]: ['Значение поля должно быть уникальным.']
						}
					}, HttpStatus.BAD_REQUEST)
				}
				else if (err.code === 'P2025' && err.meta) {
					throw new GeneralHttpException({
						message: 'Сущность не найдена.'
					}, HttpStatus.BAD_REQUEST)
				}
				else {
					throw new GeneralHttpException({
						message: 'Необработанная ошибка. Требуется актуализировать список.'
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
	createFailResponse(statusCode: HttpStatus, message?: string, ): ResponseObjType.Fail {
		return {
			status: 'fail',
			statusCode,
			message
		}
	}
}
