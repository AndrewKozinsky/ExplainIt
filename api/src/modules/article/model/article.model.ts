import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import articleConstraints from './article.constraints'
import ProposalsGroup from '../../proposalsGroup/model/proposalsGroup.model'
import { CreationOptional } from 'sequelize'

@Table
export class Article extends Model<Partial<Article>> {
	// Объявление автоматически добавляемых свойств чтобы TS понимал типы
	declare id: number
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>

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
	summary: string // Краткое описание главы

	@Column({
		type: DataType.TEXT,
		allowNull: false,
		defaultValue: ''
	})
	content: string // Содержимое главы

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number // Порядковый номер статьи

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	payAtn?: boolean // Нужно ли обратить внимание на эту статью

	@HasMany(
		() => ProposalsGroup,
		{ onDelete: 'CASCADE' })
	proposalsGroups: ProposalsGroup[]
}
