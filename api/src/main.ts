import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	// @ts-ignore
	await app.listen(process.env.PORT)
	console.log('API started at port ' + process.env.PORT + '🔥')
}
bootstrap()
