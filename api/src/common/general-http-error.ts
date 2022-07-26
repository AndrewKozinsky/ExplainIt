import { HttpException, HttpStatus } from '@nestjs/common'
import { ResponseObjType } from '../types/responseTypes'

/**
 * Обёрточный класс для HTTP-исключения.
 * Он только контролирует чтобы ошибки были занесены в правильном формате
 * в котором в дальнейшем они будут отправлены клиенту.
 */
export class GeneralHttpException extends HttpException {
	constructor(errorsObj: ResponseObjType.ErrorsGroup, statusCode: HttpStatus) {
		super(errorsObj, statusCode)
	}
}
