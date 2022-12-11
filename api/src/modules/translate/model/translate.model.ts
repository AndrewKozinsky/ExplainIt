import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import translateConstraints from './translate.constraints'
import { DataTypes } from 'sequelize'
import { WritingProposal } from '../../writingProposal/model/writingProposal.model'

@Table
export class Translate extends Model<Partial<Translate>> {
	/*@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number*/

	@Column({
		type: DataType.TEXT(),
		defaultValue: ''
	})
	analysis?: string // Разбор перевода данного пользователем

	@Column({
		type: DataTypes.ARRAY(DataTypes.STRING(translateConstraints.translations.maxLength)),  // Varchar(255)
		allowNull: false,
	})
	translations: string[] // Варианты похожих предложений

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	correct?: boolean // Верен ли перевод

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	checked?: boolean // Полностью ли проверено предложение?

	@ForeignKey(() => WritingProposal)
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false
	})
	proposalId: number // id предложения, к которой принадлежит этот перевод
}
