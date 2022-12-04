import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import groupConstraints from './group.constraints'
import { Article } from '../../articles/model/article.model'

@Table({
	timestamps: false
})
export class ExercisesGroup extends Model<Partial<ExercisesGroup>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(groupConstraints.type.maxLength),  // Varchar(255)
		allowNull: false,
	})
	type: string // Тип упражнений: oral или writing

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number // Порядковый номер блока с упражнениями в списке упражнений статьи

	@ForeignKey(() => Article)
	@Column({ allowNull: false })
	articleId: number // id статьи к которой принадлежит эта группа упражнений
}
