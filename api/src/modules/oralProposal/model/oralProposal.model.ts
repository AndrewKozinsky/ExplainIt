import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import oralProposalConstraints from './oralProposal.constraints'
import { ProposalsGroup } from '../../proposalsGroup/model/proposalsGroup.model'
import { Word } from '../../word/model/word.model'

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
	rusProposal: string // Русский вариант предложения

	@Column({
		type: DataType.STRING(oralProposalConstraints.note.maxLength),  // Varchar(255)
	})
	note?: string // Заметка про голосовое упражнение

	@Column({
		type: DataType.STRING(oralProposalConstraints.engProposal.maxLength),  // Varchar(255)
		allowNull: false,
	})
	engProposal: string // Английский вариант предложения

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	published?: boolean // Опубликовано ли предложение

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

	@HasMany(
		() => Word,
		{ onDelete: 'CASCADE' })
	words: Word[]
}
