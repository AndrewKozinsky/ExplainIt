import React from 'react'
import cn from 'classnames'
import Label from '../Label/Label'
import { OptionsType } from './SelectTypes'
import { getOptions } from './Select-func'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import './Select.scss'


export type SelectPropType = MFTypes.SelectCompProps & {
	label?: string // Подпись выпадающего списка
	layout?: 'vertical' | 'horizontal' // Расположение поля и подписи
	border?: boolean // Должна ли быть рамка?
	// mName: string // Имя выпадающего списка
	// mValue: string // Выбранное значение выпадающего списка
	// mError?: null | string // Текст ошибки
	// mDisabled: boolean // Выбранное значение выпадающего списка
	// mOptions: OptionsType // Массив для генерации тегов <option>
	// mOnChange: any, // Обработчик изменения поля
	// mOnBlur?: any // Обработчик потери фокуса полем
}

/** Компонент выпадающего списка */
function Select(props: SelectPropType) {
	const {
		label = '',
		layout = 'vertical',
		border = true,
		mName,
		mValue,
		mError = null,
		mDisabled,
		mOptions,
		mOnChange,
		mOnBlur = () => {}
	} = props

	// Атрибуты поля
	const inputAttribs = {
		name: mName,
		value: mValue,
		disabled: mDisabled,
		className: cn('select-input__input', border && 'select-input__input--border-color'),
		onChange: mOnChange,
		onBlur: mOnBlur
	}

	if (layout == 'vertical') {
		return <VerticalInput label={label} inputAttribs={inputAttribs} mOptions={mOptions} />
	}
	else {
		return <HorizontalInput label={label} inputAttribs={inputAttribs} mOptions={mOptions} />
	}
}

export default Select


type InputView = {
	label: string // Подпись текстового поля
	inputAttribs: Record<string, any>
	mOptions: OptionsType // Массив для генерации тегов <option>
}

function VerticalInput(props: InputView) {
	const { label, inputAttribs, mOptions } = props

	return (
		<div className='select-input'>
			{label && <Label label={label} layout='vertical' />}
			<select {...inputAttribs}>
				{getOptions(mOptions)}
			</select>
		</div>
	)
}

function HorizontalInput(props: InputView) {
	const { label, inputAttribs, mOptions } = props

	return (
		<div className={cn('select-input', 'select-input--horizontal')}>
			{label && <Label label={label} layout='horizontal' />}
			<select {...inputAttribs}>
				{getOptions(mOptions)}
			</select>
		</div>
	)
}
