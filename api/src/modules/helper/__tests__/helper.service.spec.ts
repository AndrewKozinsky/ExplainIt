import { Test } from '@nestjs/testing'
import { ResponseObjType } from '../../../types/responseTypes'
import { HttpStatus } from '@nestjs/common'
import { HelperService } from '../helper.service'

describe('ArticlesController', () => {
	let helperService: HelperService
	
	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			controllers: [],
			providers: [HelperService],
		}).compile()
		
		helperService = moduleRef.get<HelperService>(HelperService)
	})
	
	describe('HelperService > runQuery', () => {
		const runQueryReturnObj = new Promise((resolve) => {
			resolve({
				someProp: 'propValue'
			})
		})
		
		function queryFn(): Promise<unknown> {
			return runQueryReturnObj
		}
		
		const mockCallback = jest.fn(queryFn)
		
		it('Функция определена', async () => {
			expect(	helperService.runQuery(mockCallback) ).toBeDefined()
		})
		
		it('Переданная функция вызывается 1 раз	', async () => {
			expect( mockCallback.mock.calls.length ).toBe(1)
		})
	})
	
	describe('HelperService > createSuccessResponse', () => {
		const data = { article: [] }
		
		const responseObj: ResponseObjType.Success<typeof data> = {
			status: 'success',
			statusCode: HttpStatus.OK,
			data
		}
		
		it('Функция возвращает правильный объект', async () => {
			jest.spyOn(helperService, 'createSuccessResponse').mockImplementation(() => responseObj)
			
			expect(helperService.createSuccessResponse(data, HttpStatus.OK))
				.toBe(responseObj)
		})
	})
	
	describe('HelperService > createFailResponse', () => {
		const message = 'Some error message'
		
		const responseObj: ResponseObjType.Fail = {
			status: 'fail',
			statusCode: HttpStatus.FORBIDDEN,
			message
		}
		
		it('Функция определена', async () => {
			jest.spyOn(helperService, 'createFailResponse').mockImplementation(() => responseObj)
			
			expect(helperService.createFailResponse(HttpStatus.OK, message))
				.toBeDefined()
		})
		
		it('Статус равен fail', async () => {
			jest.spyOn(helperService, 'createFailResponse').mockImplementation(() => responseObj)
			
			expect(helperService.createFailResponse(HttpStatus.OK, message).status)
				.toBe('fail')
		})
		
		it('Сообщение соответствует переданному', async () => {
			jest.spyOn(helperService, 'createFailResponse').mockImplementation(() => responseObj)
			
			expect(helperService.createFailResponse(HttpStatus.OK, message).message)
				.toBe(message)
		})
	})
})
