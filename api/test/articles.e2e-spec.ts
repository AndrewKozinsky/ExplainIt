import request from 'supertest'
import { Test } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import CreateArticleDto from '../src/modules/articles/dto/create-article.dto'
import { AppModule } from '../src/modules/app/app.module'
import { ArticleRespType, ResponseObjType } from '../src/types/responseTypes'
import UpdateArticleDto from '../src/modules/articles/dto/update-article.dto'

// Данные новой создаваемой статьи
const newArticleDTO: CreateArticleDto = {
	name: 'name',
	article_number: '100',
	summary: 'summary',
	content: 'content',
	order_number: 5
}

/**
 * Функция создаёт в БД тестовую статью с которой должны работать последующие функции
 * @param {Object} app — объект приложения
 * @param {Function} done — функция запускаемая, чтобы обозначить, что тест завершён.
 * @param {Function} afterCreate — функция запускаемая после создания статьи. Получает данные этой статьи.
 */
function createTestArticle(app: INestApplication, done: Function, afterCreate?: Function) {
	// Создать статью
	request(app.getHttpServer())
		.post('/articles')
		.send(newArticleDTO)
		.set({ 'admin-password': 'ztpmftw4PO' })
		.then((res) => {
			if (afterCreate) {
				// Запустить функцию поиска созданной статьи
				afterCreate(res.body)
			}
			else {
				done()
			}
		})
}

function getResBody(res: request.Response): ResponseObjType.Success<ArticleRespType.Generic> {
	return res.body
}

describe('Articles', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleRef.createNestApplication()
		await app.init()
	})
	
	afterEach(async () => {
		// Удаление всех статей после каждого теста
		return request(app.getHttpServer())
			.delete('/articles/all')
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(HttpStatus.OK)
	})
	
	it('Получение всех статей /articles (GET)', (done) => {
		// Создать статью
		createTestArticle(app, done, getArticles)
		
		// Функция получает все статьи
		function getArticles() {
			request(app.getHttpServer())
				.get('/articles')
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.then((res) => {
					const { data } = getResBody(res)
					expect(data.articles.length).toBe(1)
					
					done()
				})
		}
	})
	
	
	it('Запрос существующий статьи по id /articles/4 (GET)', (done) => {
		// Создать статью, которую буду получать в следующем запросе
		createTestArticle(app, done, handleArticleData)
		
		// Функция получает данные созданной статьи и запрашивает её
		function handleArticleData(data: ResponseObjType.Success<ArticleRespType.Generic>) {
			request(app.getHttpServer())
				.get('/articles/' + data.data.articles[0].id)
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.then((res) => {
					const { data } = getResBody(res)
					expect(data.articles.length).toBe(1)
					
					done()
				})
		}
	})
	
	
	it('Запрос несуществующий статьи по id /articles/4 (GET)', (done) => {
		request(app.getHttpServer())
			.get('/articles/' + 9999)
			.expect(HttpStatus.BAD_REQUEST)
			.then((res) => {
				done()
			})
	})
	
	
	it('Создание статьи /articles (POST)', (done) => {
		request(app.getHttpServer())
			.post('/articles')
			.send(newArticleDTO)
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(HttpStatus.CREATED)
			.then((res) => {
				const { data } = getResBody(res)
				expect(data.articles.length).toBe(1)
				
				done()
			})
	})
	
	
	it('Изменение существующий статьи по id /articles/4 (PATCH)', (done) => {
		// Создать статью, которую буду изменять в следующем запросе
		createTestArticle(app, done, handleArticleData)
		
		const updateArticleDTO: UpdateArticleDto = {
			name: 'New name',
		}
		
		// Функция получает данные созданной статьи и изменяет её
		function handleArticleData(data: ResponseObjType.Success<ArticleRespType.Generic>) {
			request(app.getHttpServer())
				.patch('/articles/' + data.data.articles[0].id)
				.send(updateArticleDTO)
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.then((res) => {
					const { data } = getResBody(res)
					expect(data.articles[0].name).toBe('New name')
					
					done()
				})
		}
	})
	
	it('Изменение несуществующий статьи по id /articles/4 (PATCH)', (done) => {
		const updateArticleDTO: UpdateArticleDto = {
			name: 'New name',
		}
		
		// Функция получает данные созданной статьи и изменяет её
		request(app.getHttpServer())
			.patch('/articles/' + 9999)
			.send(updateArticleDTO)
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(HttpStatus.BAD_REQUEST)
			.then((res) => {
				done()
			})
	})
	
	
	it('Удаление всех статей /articles (DELETE)', (done) => {
		// Создать статью
		createTestArticle(app, done, deleteArticles)
		
		// Функция удаляет все статьи
		function deleteArticles() {
			request(app.getHttpServer())
				.delete('/articles/all')
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.then((res) => {
					const { data } = getResBody(res)
					expect(data.articles.length).toBe(0)
					
					done()
				})
		}
	})
	
	
	it('Удаление существующий статьи по id /articles/4 (DELETE)', (done) => {
		// Создать статью, которую буду удалять в следующем запросе
		createTestArticle(app, done, handleArticleData)
		
		// Функция получает данные созданной статьи и удаляет её
		function handleArticleData(data: ResponseObjType.Success<ArticleRespType.Generic>) {
			request(app.getHttpServer())
				.delete('/articles/' + data.data.articles[0].id)
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.then((res) => {
					const { data } = getResBody(res)
					expect(data.articles.length).toBe(0)
					
					done()
				})
		}
	})
	
	it('Удаление несуществующий статьи по id /articles/4 (DELETE)', (done) => {
		request(app.getHttpServer())
			.delete('/articles/' + 9999)
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(HttpStatus.BAD_REQUEST)
			.then((res) => {
				done()
			})
	})
	

	afterAll(async () => {
		await app.close()
	})
})
