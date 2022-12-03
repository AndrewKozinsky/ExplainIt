import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common'
import { ExercisesGroupRespType } from '../../types/responseTypes'
import { HelperService } from '../helper/helper.service'
import { ExercisesGroupService } from './exercisesGroup.service'
import CreateExercisesGroupDto from './dto/create-exercises-group.dto'
import { Response } from 'express'

@Controller('exercisesGroup')
export class ExercisesGroupController {
	constructor(
		private readonly exercisesGroupService: ExercisesGroupService,
		private readonly helperService: HelperService
	) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body() articleDto: CreateExercisesGroupDto
	): ExercisesGroupRespType.SuccessReturn<ExercisesGroupRespType.CreateOne> {
		// Создать новую группу упражнений в БД
		const createdGroup = await this.exercisesGroupService.createOne(articleDto)

		// Сформировать и возвратить клиенту ответ
		return this.helperService.createSuccessResponse<ExercisesGroupRespType.Payload<ExercisesGroupRespType.CreateOne>>(
			{ exercisesGroups: createdGroup }, HttpStatus.CREATED
		)
	}

	@Delete(':id')
	async deleteOne(
		@Param('id', ParseIntPipe) id: number,
		@Res({ passthrough: true }) res: Response
	): ExercisesGroupRespType.SuccessOrFailReturn<null> {
		// Удалить группу упражнений
		const isDeleted = await this.exercisesGroupService.deleteOne(id)

		if (isDeleted) {
			return this.helperService.createSuccessResponse<ExercisesGroupRespType.Payload<null>> (
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
