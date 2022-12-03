import { Injectable } from '@nestjs/common'
import { ExercisesGroupRespType } from '../../types/responseTypes'
import { Sequelize } from 'sequelize-typescript'
import { InjectModel } from '@nestjs/sequelize'
import { HelperService } from '../helper/helper.service'
import { ExercisesGroup } from './model/exercisesGroup.model'
import CreateExercisesGroupDto from './dto/create-exercises-group.dto'

@Injectable()
export class ExercisesGroupService {
	constructor(
		private sequelize: Sequelize,

		@InjectModel(ExercisesGroup)
		private exercisesGroup: typeof ExercisesGroup,
		private readonly helperService: HelperService
	) {}

	// Создание группы упражнений
	async createOne(exercisesGroupDto: CreateExercisesGroupDto): Promise<ExercisesGroupRespType.CreateOne | never> {
		return this.helperService.runQuery<ExercisesGroup>(() => {
			return this.exercisesGroup.create(exercisesGroupDto)
		})
	}

	// Удаление группы упражнений
	async deleteOne(groupId: number): Promise<true | never> {
		return this.helperService.runQuery<true>(async () => {
			await this.exercisesGroup.destroy(
				{
					where: { id: groupId }
				}
			)

			return true
		})
	}
}
