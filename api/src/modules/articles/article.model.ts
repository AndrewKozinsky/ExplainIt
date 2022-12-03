import { Column, DataType, Model, Table } from 'sequelize-typescript'

//export class Article extends Model<Partial<Article>> {

@Table
export class Article extends Model<Article> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(255),  // Varchar(255)
		allowNull: false,
	})
	name: string

	@Column({
		type: DataType.STRING(255),  // Varchar(255)
		allowNull: false,
	})
	chapter: string

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	published?: boolean

	@Column({
		type: DataType.STRING(255),  // Varchar(255)
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
}
