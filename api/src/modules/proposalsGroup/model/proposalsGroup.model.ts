import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript'
import groupConstraints from './group.constraints'
import { Article } from '../../article/model/article.model'
import OralProposal from '../../oralProposal/model/oralProposal.model'
import WritingProposal from '../../writingProposal/model/writingProposal.model'
import { CreationOptional } from 'sequelize'
import ModelTypes from '../../../types/modelTypes'

@Table({ timestamps: false })
export class ProposalsGroup extends Model<Partial<ProposalsGroup>> {
	// Объявление автоматически добавляемых свойств чтобы TS понимал типы
	declare id: number
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>

	@Column({
		type: DataType.STRING(groupConstraints.type.maxLength),  // Varchar(255)
		allowNull: false,
	})
	type: ModelTypes.ProposalGroup.GroupType // Тип упражнений: oral или writing

	@Column({
		type: DataType.SMALLINT, // smallint (-32 768 ... +32 767)
		allowNull: false,
	})
	order: number // Порядковый номер блока с упражнениями в списке упражнений статьи

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	payAtn?: boolean // Нужно ли обратить внимание на эту группу предложений

	@ForeignKey(() => Article)
	@Column({ allowNull: false })
	articleId: number // id статьи к которой принадлежит эта группа предложений

	@HasMany(
		() => OralProposal,
		{ onDelete: 'CASCADE' }
	)
	oralProposals: OralProposal[]

	@HasMany(
		() => WritingProposal,
		{ onDelete: 'CASCADE' }
	)
	writingProposals: WritingProposal[]
}
