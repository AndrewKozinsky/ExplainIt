// import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
// import { Observable } from 'rxjs'

/**
 * Стражник проверяет, что запрос сделал администратор.
 * Пока просто проверяется, что передан заголовок Admin-Password с указанным значением.
 */
// @Injectable()
/*export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		const isAdmin =  request.headers['admin-password'] === 'ztpmftw4PO'

		if (isAdmin) {
			return true
		}
		else {
			throw new HttpException({
				message: 'У вас нет прав доступа к этому маршруту',
			}, HttpStatus.BAD_REQUEST)
		}
	}
}*/

export {}
