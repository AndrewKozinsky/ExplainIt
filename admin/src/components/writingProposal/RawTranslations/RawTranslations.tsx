import React from 'react'
import { useGetDeleteRowProposal, useGetRows } from './fn/RawTranslations-func'
import SmallContentWrapper from '../../common/Blocks/SmallContentWrapper/SmallContentWrapper'
import Header from '../../common/Header/Header'
import Button from '../../formElements/Button/Button'
import './RawTranslations.scss'

// Список необработанных переводов русского предложения
function RawTranslations() {
	const rows = useGetRows()

	if (rows.length == 0) {
		return null
	}

	return (
		<div>
			<Header text='Необработанные переводы' />
			<SmallContentWrapper extraClass='raw-translations'>
				{rows.map((text, i) => {
					return <Row text={text} key={i} />
				})}
			</SmallContentWrapper>
		</div>
	)
}

export default RawTranslations

type RowPropType = {
	text: string
}

// Ряд с текстом необработанного предложения и кнопкой удаления
function Row(props: RowPropType) {
	const { text } = props

	const deleteRowProposal = useGetDeleteRowProposal(text)

	return (
		<div className='raw-translations__row'>
			<p className='raw-translations__text'>{text}</p>
			<Button view='onlyIcon' icon='btnSignTrash' onClick={deleteRowProposal} />
		</div>
	)
}
