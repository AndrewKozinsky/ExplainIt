import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import writingProposalConstraints from './writingProposal.constraints'
import { ProposalsGroup } from '../../proposalsGroup/model/proposalsGroup.model'
import { DataTypes } from 'sequelize'
import { Translate } from '../../translate/model/translate.model'
import { Word } from '../../word/model/word.model'

@Table
export class WritingProposal extends Model<Partial<WritingProposal>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(writingProposalConstraints.rusProposal.maxLength),  // Varchar(255)
		allowNull: false,
	})
	rusProposal: string // Русский вариант предложения

	@Column({
		type: DataType.STRING(writingProposalConstraints.note.maxLength),  // Varchar(255)
	})
	note?: string // Заметка про упражнение

	@Column({
		type: DataTypes.ARRAY(DataTypes.STRING(writingProposalConstraints.badTranslations.maxLength)),  // Varchar(255)
		allowNull: false,
	})
	badTranslations: string[] // Предложения блока «Вообще не так»

	@Column({
		type: DataTypes.ARRAY(DataTypes.STRING(writingProposalConstraints.rawTranslations.maxLength)),  // Varchar(255)
		allowNull: false,
	})
	rawTranslations: string[] // Необработанные переводы

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
		() => Translate,
		{ onDelete: 'CASCADE' }
	)
	translates: Translate[]

	// @HasMany(
	// 	() => Word,
	// 	{ onDelete: 'CASCADE' })
	// words: Word[]
}
