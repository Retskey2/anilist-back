import * as cookieParser from 'cookie-parser'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.setGlobalPrefix('api')
	app.enableCors()
	app.use(cookieParser())

	await app.listen(4000)
}
bootstrap()
