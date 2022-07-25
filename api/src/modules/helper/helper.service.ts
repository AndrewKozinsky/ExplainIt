import { HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from 'prisma/client'
import ResponseObjType from '../../types/responseObjType'
import { GeneralHttpException } from '../../common/general-http-error'

/**
 * Класс с различными методами используемые на всём приложении
 */
@Injectable()
export class HelperService {

	/**
	 * Метод запускает функцию с методом Призмы. Например для записи сущности в таблицу БД.
	 * При появлении ошибки будет выброшено исключение.
	 * @param queryFn
	 */
	async runQuery<T>(queryFn: () => Promise<T>): Promise<T | never> {
		try {
			return await queryFn()
		}
		catch(err) {
			// Типы ошибок Призмы описаны в prisma.io/docs/reference/api-reference/error-reference
			if (err instanceof Prisma.PrismaClientKnownRequestError) {
				
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
						message: 'Удаляемой сущности не найдено.'
					}, HttpStatus.BAD_REQUEST)
				}
				else {
				}
			}

			// Если выпадает такая ошибка, то нужно дополнить код новым условием.
			throw new Error('Неизвестная ошибка. Требуется актуализировать список.')
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
}
