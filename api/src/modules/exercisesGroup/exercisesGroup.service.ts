import { Injectable } from '@nestjs/common'
import { Sequelize } from 'sequelize-typescript'
import { InjectModel } from '@nestjs/sequelize'
import { HelperService } from '../helper/helper.service'
import { ExercisesGroup } from './model/exercisesGroup.model'
import CreateGroupDto from './dto/createGroup.dto'
import { ExercisesGroupRespType } from './response/responseTypes'
import UpdateGroupDto from './dto/updateGroup.dto'

@Injectable()
export class ExercisesGroupService {
	constructor(
		private sequelize: Sequelize,

		@InjectModel(ExercisesGroup)
		private exercisesGroup: typeof ExercisesGroup,

		private readonly helperService: HelperService
	) {}

	// Создание группы упражнений
	async createOne(exercisesGroupDto: CreateGroupDto): Promise<ExercisesGroupRespType.CreateOne | never> {
		return this.helperService.runQuery<ExercisesGroupRespType.CreateOne>(() => {
			return this.exercisesGroup.create(exercisesGroupDto)
		})
	}

	// Обновление группы упражнений
	async updateOne(groupId: number, groupDto: UpdateGroupDto): Promise<ExercisesGroupRespType.UpdateOne> {
		return this.helperService.runQuery<ExercisesGroupRespType.UpdateOne>(async () => {
			const result = await this.exercisesGroup.update(
				groupDto,
				{
					where: { id: groupId },
					returning: true
				}
			)

			return result[1][0]
		})
	}

	// Удаление группы упражнений
	async deleteOne(groupId: number): Promise<ExercisesGroupRespType.DeleteOne | never> {
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
