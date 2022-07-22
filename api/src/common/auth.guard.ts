import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

/**
 * Стражник проверяет, что запрос сделал администратор.
 * Пока просто проверяется, что передан заголовок Admin-Password с указанным значением.
 */
@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp()
		const request = ctx.getRequest()

		return request.headers['admin-password'] === 'ztpmftw4PO'
	}
}
