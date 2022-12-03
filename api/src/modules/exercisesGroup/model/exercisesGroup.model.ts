import { Column, DataType, Model, Table } from 'sequelize-typescript'
import exercisesGroupConstraints from './exercisesGroup.constraints'

@Table
export class ExercisesGroup extends Model<Partial<ExercisesGroup>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	article_id: number // id статьи к которой принадлежит эта группа упражнений

	@Column({
		type: DataType.STRING(exercisesGroupConstraints.type.maxLength),  // Varchar(255)
		allowNull: false,
	})
	type: string // Тип упражнений (oral | writing)

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number // Порядковый номер блока с упражнениями в списке упражнений статьи
}
