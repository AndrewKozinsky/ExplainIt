import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import articleConstraints from './article.constraints'
import { ProposalsGroup } from '../../proposalsGroup/model/proposalsGroup.model'

@Table
export class Article extends Model<Partial<Article>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(articleConstraints.name.maxLength),  // Varchar(255)
		allowNull: false,
	})
	name: string // Название главы

	@Column({
		type: DataType.STRING(articleConstraints.chapter.maxLength),  // Varchar(255)
		allowNull: false,
	})
	chapter: string // Номер главы. Например «Вводная глава» или «Глава 5»

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	published?: boolean // Опубликована ли глава

	@Column({
		type: DataType.STRING(articleConstraints.summary.maxLength),  // Varchar(255)
		allowNull: false,
	})
	summary: string

	@Column({
		type: DataType.TEXT,
		allowNull: false,
	})
	content: string

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number

	@HasMany(
		() => ProposalsGroup,
		{ onDelete: 'CASCADE' })
	proposalsGroups: ProposalsGroup[]
}
