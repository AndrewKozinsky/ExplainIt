import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { IsPositive, Max } from 'class-validator'
import wordConstraints from './word.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'
import articleConstraints from '../../article/model/article.constraints'
import { WritingProposal } from 'src/modules/writingProposal/model/writingProposal.model'
import { OralProposal } from '../../oralProposal/model/oralProposal.model'

@Table
export class Word extends Model<Partial<Word>> {
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(wordConstraints.rusWord.maxLength),  // Varchar(255)
		allowNull: false,
	})
	rusWord?: string // Слово на русском языке

	@Column({
		type: DataType.STRING(wordConstraints.note.maxLength),  // Varchar(255)
		allowNull: false,
	})
	note?: string // Примечание к слову

	@Column({
		type: DataType.STRING(wordConstraints.rusWord.maxLength),  // Varchar(255)
		allowNull: false,
	})
	engWord?: string // Слово на английском языке

	@Column({
		type: DataTypes.ARRAY(DataTypes.STRING(wordConstraints.wrongVerbs.maxLength)),  // Varchar(255)
		allowNull: false,
	})
	wrongVerbs: string[] // Варианты похожих предложений

	@IsPositive({ message: dtoErrorMessages.mustBeNumber })
	@Max(
		articleConstraints.order.max,
		{ message: dtoErrorMessages.shouldNotBeMore(articleConstraints.order.max) }
	)
	order: number // Порядковый номер слова

	@ForeignKey(() => OralProposal)
	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
	})
	oralProposalId: number // id голосового предложения, к которой принадлежит этот перевод

	// Пока оставить закомментированным
	// @ForeignKey(() => WritingProposal)
	// @Column({
	// 	type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
	// })
	// writingProposalId: number // id письменного предложения, к которой принадлежит этот перевод
}
