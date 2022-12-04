import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import oralProposalConstraints from './oralProposal.constraints'
import { ProposalsGroup } from '../../proposalsGroup/model/proposalsGroup.model'

@Table
export class OralProposal extends Model<Partial<OralProposal>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(oralProposalConstraints.rusProposal.maxLength),  // Varchar(255)
		allowNull: false,
	})
	rusProposal: string // Название главы

	@Column({
		type: DataType.STRING(oralProposalConstraints.note.maxLength),  // Varchar(255)
	})
	note: string // Номер главы. Например «Вводная глава» или «Глава 5»

	@Column({
		type: DataType.STRING(oralProposalConstraints.engProposal.maxLength),  // Varchar(255)
		allowNull: false,
	})
	engProposal: string

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	published?: boolean // Опубликована ли глава

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number

	@ForeignKey(() => ProposalsGroup)
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false
	})
	proposalsGroupId: number // id группы предложений, к которой принадлежит это предложение
}
