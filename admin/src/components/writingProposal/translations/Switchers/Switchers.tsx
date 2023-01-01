import React, { useContext } from 'react'
import { StateContext } from '../Translations/fn/stateContext'
import { useGetOnSwitchChange } from './fn/main'
import Toggle from '../../../formElements/Toggle/Toggle'
import './Switchers.scss'

type AnalysisPropType = {
	blockId: number
	checked: boolean
	correct: boolean
}

// Переключатели правильности перевода и проверено ли предложение
function Switchers(props: AnalysisPropType) {
	const { blockId, checked, correct } = props

	const { state, setState } = useContext(StateContext)
	const onCheckedChange = useGetOnSwitchChange(state, setState, blockId, 'checked')
	const onCorrectChange = useGetOnSwitchChange(state, setState, blockId, 'correct')

	return (
		<div className='translation-switchers'>
			<Toggle
				label='Правильный перевод'
				mValue=''
				mOnChange={onCheckedChange}
				mChecked={checked}
			/>
			<Toggle
				label='Проверено'
				mValue=''
				mOnChange={onCorrectChange}
				mChecked={correct}
			/>
		</div>
	)
}

export default Switchers
