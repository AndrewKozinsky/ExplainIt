import React from 'react'
import cn from 'classnames'
import Label from '../Label/Label'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import './TextInput.scss'

export type TextInputPropType = MFTypes.TextCompProps & {
	label?: string // Подпись текстового поля
	inputType?: 'text' | 'textarea' // Тип поля ввода
	fieldType?: 'text' | 'email' | 'password' // Значение атрибута type
	rows?: number // Количество рядов у текстового поля
	layout?: 'vertical' | 'horizontal' // Расположение поля и подписи
	// mName: string // Аттрибут name текстового поля
	// mValue: string // Аттрибут value текстового поля
	// mError?: null | string // Текст ошибки
	// mDisabled?: boolean // Заблокировано ли поле
	// mOnChange: any // Обработчик изменения поля
	// mOnBlur?: any // Обработчик потери фокуса поля
}

// Текстовое поле ввода или текстовая область ввода
function TextInput(props: TextInputPropType) {
	const {
		label = '',
		inputType = 'text',
		fieldType = 'text',
		rows = 5,
		layout = 'vertical',
		mName = 'name',
		mValue = '',
		mError = null,
		mDisabled = false,
		mOnChange,
		mOnBlur = () => {},
	} = props

	// Аттрибуты поля
	const inputAttribs: Record<string, any> = {
		type:     fieldType,
		name:     mName,
		value:    mValue,
		disabled: mDisabled,
		onChange: mOnChange,
		onBlur:   mOnBlur,
		className: 'text-input__input'
	}

	if (layout == 'vertical') {
		return (
			<VerticalInput
				label={label}
				inputType={inputType}
				rows={rows}
				mError={mError}
				inputAttribs={inputAttribs}
			/>
		)
	}
	else {
		return (
			<HorizontalInput
				label={label}
				inputType={inputType}
				rows={rows}
				mError={mError}
				inputAttribs={inputAttribs}
			/>
		)
	}
}

export default TextInput


type InputView = {
	label: string // Подпись текстового поля
	inputType: 'text' | 'textarea' // Тип поля ввода
	rows: number // Количество рядов у текстового поля
	mError: null | string // Текст ошибки
	inputAttribs: Record<string, any>
}

function VerticalInput(props: InputView) {
	const { label, inputType, rows = 5, mError, inputAttribs } = props

	return (
		<div className='text-input'>
			{label && <Label label={label} layout='vertical' />}
			{inputType === 'text' &&
				<input {...inputAttribs} />
			}
			{inputType === 'textarea' &&
				<textarea {...inputAttribs} rows={rows} />
			}
			{mError && <ErrorMessage text={mError} />}
		</div>
	)
}

function HorizontalInput(props: InputView) {
	const { label, inputType, rows = 5, mError, inputAttribs } = props

	return (
		<div className={cn('text-input', 'text-input--horizontal')}>
			{label && <Label label={label} layout='horizontal' />}
			{inputType === 'text' &&
				<input {...inputAttribs} />
			}
			{inputType === 'textarea' &&
				<textarea {...inputAttribs} rows={rows} />
			}
			{mError && <ErrorMessage text={mError} />}
		</div>
	)
}
