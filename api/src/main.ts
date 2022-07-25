import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './modules/app/app.module'
import { ReqBodyPipe } from './common/req-body.pipe'
import { HttpExceptionFilter } from './common/http-exeption.filter'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// Проверка тела запроса на соответствие схемы
	app.useGlobalPipes(new ReqBodyPipe())
	app.useGlobalFilters(new HttpExceptionFilter())
	
	// Swagger
	const config = new DocumentBuilder()
		.setTitle('API explainit.ru')
		.setDescription('Описание API по адресу /api')
		.setVersion('1.0')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)

	await app.listen(process.env.PORT)
	console.log('API started at port ' + process.env.PORT + ' in ' + process.env.WORK_MODE.toUpperCase() + ' mode ' + '🔥')
}
bootstrap()
