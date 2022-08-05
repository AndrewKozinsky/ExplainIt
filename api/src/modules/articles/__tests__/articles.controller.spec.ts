import mocks from 'node-mocks-http'
import { Test } from '@nestjs/testing'
import { Article } from 'prisma/client'
import { HelperService } from '../../helper/helper.service'
import { ArticlesController } from '../articles.controller'
import { ArticlesService } from '../articles.service'
import { HelperModule } from '../../helper/helper.module'
import { HttpStatus } from '@nestjs/common'
import { ArticleRespType, ResponseObjType } from '../../../types/responseTypes'


const req = mocks.createRequest()
const res = req.res = mocks.createResponse()

const allArticles: Article[] = [
	{
		id: 1,
		name: 'Вводная глава',
		label: 'Вводная глава',
		published: true,
		summary: 'Краткое описание статьи',
		content: 'Контент вводной статьи',
		order: 1
	},
	{
		id: 2,
		name: 'Первая глава',
		label: 'Первая глава',
		published: false,
		summary: 'Краткое описание первой главы',
		content: 'Контент первой главы',
		order: 2
	},
]

describe('ArticlesController', () => {
	let articlesController: ArticlesController

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [HelperModule],
			controllers: [ArticlesController],
			providers: [ArticlesService],
		})
			.useMocker((token) => {
				if (token === HelperService) {
					return {}
				}
			})
			.overrideProvider(ArticlesService)
			.useValue({
				getAll: () => allArticles,
				getOne: (idx: number) => allArticles[idx],
				create: (newArticle: Article) => {
					newArticle.id = allArticles.length + 1
					return newArticle
				},
				update: (idx: number) => allArticles[idx],
				deleteAll: () => [],
				deleteOne: (idx: number) => allArticles[idx],
			})
			.compile()

		articlesController = moduleRef.get<ArticlesController>(ArticlesController)
	})


	describe('getAll()', () => {
		const getAllArticlesResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.ArticleItem[]>> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data: { articles: allArticles }
		}

		it('Получение правильного ответа', async () => {
			expect(await articlesController.getAll())
				.toEqual(getAllArticlesResp)
		})
	})


	describe('getOne()', () => {
		const getOneArticleResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.Article[]>> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data: { articles: [allArticles[0]] }
		}

		it('Запрос существующей статьи', async () => {
			expect(await articlesController.getOne(0, res))
				.toEqual(getOneArticleResp)
		})
	})


	describe('getOne()', () => {
		const getNonExistingArticleResp: ResponseObjType.Fail = {
			status: 'fail',
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Статья не найдена'
		}

		it('Запрос несуществующей статьи', async () => {
			expect(await articlesController.getOne(999, res))
				.toEqual(getNonExistingArticleResp)
		})
	})


	describe('create()', () => {
		const newArticle: Article = {
			id: 3,
			name: 'Глава 3',
			label: '3',
			published: false,
			summary: 'Краткое описание статьи',
			content: 'Контент вводной статьи',
			order: 3
		}
		const createOneArticleResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.Article[]>> = {
			status: 'success',
			statusCode: HttpStatus.CREATED,
			data: { articles: [newArticle] }
		}

		it('Создание статьи', async () => {
			expect(await articlesController.create(newArticle))
				.toEqual(createOneArticleResp)
		})
	})


	describe('update()', () => {
		const updateArticleResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.Article[]>> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data: { articles: [allArticles[0]] }
		}

		it('Обновление существующей статьи', async () => {
			expect(await articlesController.update({}, 0, res))
				.toEqual(updateArticleResp)
		})

		const updateNonExistingArticleResp: ResponseObjType.Fail = {
			status: 'fail',
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Статья не найдена'
		}

		it('Обновление несуществующей статьи', async () => {
			expect(await articlesController.update({}, 999, res))
				.toEqual(updateNonExistingArticleResp)
		})
	})


	describe('deleteAll()', () => {
		const deleteAllArticlesResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.Article[]>> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data: { articles: [] }
		}

		it('Получение пустого массива статей после удаления', async () => {
			expect(await articlesController.deleteAll())
				.toEqual(deleteAllArticlesResp)
		})
	})


	describe('deleteOne()', () => {
		const deleteArticleResp: ResponseObjType.Success<ArticleRespType.Payload<ArticleRespType.Article[]>> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data: { articles: [allArticles[0]] }
		}

		it('Удаление существующей статьи', async () => {
			expect(await articlesController.deleteOne(0, res))
				.toEqual(deleteArticleResp)
		})

		const deleteNonExistingArticleResp: ResponseObjType.Fail = {
			status: 'fail',
			statusCode: HttpStatus.BAD_REQUEST,
			message: 'Статья не найдена'
		}

		it('Обновление несуществующей статьи', async () => {
			expect(await articlesController.update({}, 999, res))
				.toEqual(deleteNonExistingArticleResp)
		})
	})
})
