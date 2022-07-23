import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import CreateArticleDto from '../src/modules/articles/dto/create-article.dto'
import { AppModule } from '../src/modules/app/app.module'

describe('Articles', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		})
			.compile()

		app = moduleRef.createNestApplication()
		await app.init()
	})

	it('/articles (POST)', () => {
		const newArticleDTO: CreateArticleDto = {
			name: 'name',
			article_number: '100',
			summary: 'summary',
			content: 'content',
			order_number: 5
		}

		return request(app.getHttpServer())
			.post('/articles')
			.send(newArticleDTO)
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(201)
	})

	afterAll(async () => {
		await app.close()
	})
})
