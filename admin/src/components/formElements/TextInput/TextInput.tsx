import React from 'react'
import Label from '../Label/Label'
import MFTypes from 'utils/modernForm/lib/MFTypes'
import './TextInput.scss'
import ErrorMessage from "components/formElements/ErrorMessage/ErrorMessage";

export type TextInputPropType = MFTypes.TextCompProps & {
	label?: string // Подпись выше текстового компонента
	inputType?: 'text' | 'textarea' // Тип поля ввода
	fieldType?: 'text' | 'email' | 'password' // Тип поля
	rows?: number // Количество рядов у текстового поля
	// mName: string // Аттрибут name текстового поля
	// mValue: string // Аттрибут value текстового поля
	// mError?: null | string // Текст ошибки
	// mDisabled?: boolean // Заблокировано ли поле
	// mOnChange: any // Обработчик изменения поля
	// mOnBlur?: any // Обработчик потери фокуса поля
}

function TextInput(props: TextInputPropType) {
	const {
		label,
		inputType = 'text',
		fieldType = 'text',
		rows = 5,
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
		className: 'text-input'
	}

	return (
		<div>
			<Label label={label} />
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

export default TextInput
