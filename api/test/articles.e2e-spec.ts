import request from 'supertest'
import { Test } from '@nestjs/testing'
import { HttpStatus, INestApplication } from '@nestjs/common'
import CreateArticleDto from '../src/modules/articles/dto/create-article.dto'
import { AppModule } from '../src/modules/app/app.module'
import { ArticleRespType, ResponseObjType } from '../src/types/responseTypes'

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
		.end(function(err, res) {
			if (err) done(err)
			
			if (afterCreate) {
				// Запустить функцию поиска созданной статьи
				afterCreate(JSON.parse(res.text))
			}
			else {
				done()
			}
		})
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
				.end(function(err, res) {
					if (err) return done(err)
					return done()
				})
		}
	})
	
	
	it('Получение существующий статьи по id /articles/4 (GET)', (done) => {
		// Создать статью, которую буду получать в следующем запросе
		createTestArticle(app, done, handleArticleData)
		
		// Функция получает данные созданной статьи и запрашивает её
		function handleArticleData(data: ResponseObjType.Success<ArticleRespType.Generic>) {
			request(app.getHttpServer())
				.get('/articles/' + data.data.articles[0].id)
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.end(function(err, res) {
					if (err) return done(err)
					return done()
				})
		}
	})
	
	
	it('Создание статьи /articles (POST)', (done) => {
		request(app.getHttpServer())
			.post('/articles')
			.send(newArticleDTO)
			.set({ 'admin-password': 'ztpmftw4PO' })
			.expect(HttpStatus.CREATED)
			.end(function(err, res) {
				if (err) return done(err)
				return done()
			})
	})
	
	
	it('Изменение существующий статьи по id /articles/4 (PATCH)', (done) => {
		// Создать статью, которую буду изменять в следующем запросе
		createTestArticle(app, done, handleArticleData)
		
		// Функция получает данные созданной статьи и изменяет её
		function handleArticleData(data: ResponseObjType.Success<ArticleRespType.Generic>) {
			request(app.getHttpServer())
				.patch('/articles/' + data.data.articles[0].id)
				.set({ 'admin-password': 'ztpmftw4PO' })
				.expect(HttpStatus.OK)
				.end(function(err, res) {
					if (err) return done(err)
					return done()
				})
		}
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
				.end(function(err, res) {
					if (err) return done(err)
					return done()
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
				.end(function(err, res) {
					if (err) return done(err)
					return done()
				})
		}
	})
	

	afterAll(async () => {
		await app.close()
	})
})
