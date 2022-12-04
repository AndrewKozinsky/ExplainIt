import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { HelperService } from '../helper/helper.service'
import { ExercisesGroupService } from './exercisesGroup.service'
import CreateGroupDto from './dto/createGroup.dto'
import { ArticlesService } from '../articles/articles.service'
import { ExercisesGroupRespType } from './response/responseTypes'
import UpdateGroupDto from './dto/updateGroup.dto'

@Controller('exercisesGroup')
export class ExercisesGroupController {
	constructor(
		private readonly exercisesGroupService: ExercisesGroupService,
		private readonly articlesService: ArticlesService,
		private readonly helperService: HelperService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() articleDto: CreateGroupDto,
		@Res({ passthrough: true }) res: Response
	): Promise<ExercisesGroupRespType.CreateOneWrap> {
		// Проверить существует ли статья к которой делают группу упражнений
		const isArticleExist = await this.articlesService.isExist(articleDto.articleId)

		if (!isArticleExist) {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Не существует статьи к которой создают группу упражнений.'
			)
		}

		// Создать новую группу упражнений в БД
		const createdGroup = await this.exercisesGroupService.createOne(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse(
			{ exercisesGroups: createdGroup }, HttpStatus.CREATED
		)
	}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body() groupDto: UpdateGroupDto,
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ExercisesGroupRespType.UpdateOneWrap> {
		// Обновить статью в БД
		const updatedGroup = await this.exercisesGroupService.updateOne(id, groupDto)

		// Сформировать и возвратить клиенту ответ
		if (updatedGroup) {
			return this.helperService.createSuccessResponse (
				{ exercisesGroups: updatedGroup }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Группа упражнений не найдена'
			)
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): Promise<ExercisesGroupRespType.DeleteOneWrap> {
		// Удалить группу упражнений
		const isDeleted = await this.exercisesGroupService.deleteOne(id)

		if (isDeleted) {
			return this.helperService.createSuccessResponse (
				{ exercisesGroups: null }, HttpStatus.OK
			)
		}
		else {
			res.status(HttpStatus.BAD_REQUEST)
			return this.helperService.createFailResponse (
				HttpStatus.BAD_REQUEST, 'Группа упражнений не найдена'
			)
		}
	}
}
