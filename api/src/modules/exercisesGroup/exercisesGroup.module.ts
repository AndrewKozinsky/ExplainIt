import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ExercisesGroupService } from './exercisesGroup.service'
import { ExercisesGroupController } from './exercisesGroup.controller'
import { ExercisesGroup } from './model/exercisesGroup.model'

@Module({
	imports: [SequelizeModule.forFeature([ExercisesGroup])],
	providers: [ExercisesGroupService],
	controllers: [ExercisesGroupController]
})
export class ExercisesGroupModule {}
