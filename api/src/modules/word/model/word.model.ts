import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { CreationOptional, DataTypes } from 'sequelize'
import { IsPositive, Max } from 'class-validator'
import wordConstraints from './word.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import { WritingProposal } from '../../writingProposal/model/writingProposal.model'
import { OralProposal } from '../../oralProposal/model/oralProposal.model'

@Table
export class Word extends Model<Partial<Word>> {
	// Объявление автоматически добавляемых свойств чтобы TS понимал типы
	declare id: number
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>

	@Column({
		type: DataType.STRING(wordConstraints.rusWord.maxLength),  // Varchar(255)
		allowNull: false,
	})
	rusWord: string // Слово на русском языке

	@Column({
		type: DataType.STRING(wordConstraints.note.maxLength),  // Varchar(255)
	})
	note?: string // Примечание к слову

	@Column({
		type: DataType.STRING(wordConstraints.rusWord.maxLength),  // Varchar(255)
		allowNull: false,
	})
	engWord: string // Слово на английском языке

	@Column({
		type: DataTypes.ARRAY(DataTypes.STRING(wordConstraints.wrongVerbs.maxLength)),  // Varchar(255)
	})
	wrongVerbs: string[] // Варианты похожих предложений

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		wordConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(wordConstraints.order.max) }
	)
	order: number // Порядковый номер слова

	@ForeignKey(() => OralProposal)
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
	})
	oralProposalId: number // id голосового предложения, к которой принадлежит этот перевод

	// Пока оставить закомментированным
	@ForeignKey(() => WritingProposal)
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
	})
	writingProposalId: number // id письменного предложения, к которой принадлежит этот перевод
}
