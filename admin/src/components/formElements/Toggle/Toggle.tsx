import React from 'react'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import './Toggle.scss'

export type TogglePropType = MFTypes.ToggleCompProps & {
	label?: string // Подпись флага
	// mName: string // Имя группы флагов
	// mValue: string // Значение флага
	// mChecked?: boolean // Отмечено ли поле
	// mError?: null | string // Текст ошибки
	// mDisabled?: boolean // Заблокировано ли поле
	// mOnChange: any // Обработчик выбора пункта
	// mOnBlur?: any, // Обработчик потерей полем фокуса
}

/** Компонент тумблера для формы */
function Toggle(props: TogglePropType) {
	const {
		label,
		mName,
		mValue,
		mChecked = false,
		mDisabled = false,
		mOnChange,
		mOnBlur = () => {}
	} = props

	const connectId = Math.round(Math.random() * 1000).toString()


	// Атрибуты флага
	const inputAttribs = {
		type: 'checkbox',
		name: mName,
		value: mValue,
		checked: mChecked,
		disabled: mDisabled,
		onChange: mOnChange,
		onBlur: mOnBlur,
		className: 'toggle__checkbox',
		id: connectId
	}

	return (
		<div className='toggle'>
			<input {...inputAttribs} />
			<label className='toggle__label' htmlFor={connectId}>{label}</label>
		</div>
	)
}

export default Toggle
