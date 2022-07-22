import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ReqBodyPipe } from './common/req-body.pipe'
import { HttpExceptionFilter } from './common/http-exeption.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Проверка тела запроса на соответствие схемы
	app.useGlobalPipes(new ReqBodyPipe())
	app.useGlobalFilters(new HttpExceptionFilter())

	await app.listen(process.env.PORT)
	console.log('API started at port ' + process.env.PORT + '🔥')
}
bootstrap()
