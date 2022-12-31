import { IsString, MaxLength } from 'class-validator'
import writingProposalConstraints from '../model/writingProposal.constraints'
import dtoErrorMessages from '../../../utils/dtoErrorMessages'

// DTO добавления/удаления необработанного перевода
export default class RawTranslateDto {
	@IsString({ message: dtoErrorMessages.mustBeString })
	@MaxLength(
		writingProposalConstraints.rusProposal.maxLength,
		{ message: dtoErrorMessages.mustBeEqualOrShorter(writingProposalConstraints.rusProposal.maxLength) }
	)
	text: string
}
