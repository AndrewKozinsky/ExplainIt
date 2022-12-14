import React from 'react'
import './Label.scss'

type LabelPropType = {
	label?: string // Текст подписи
}

/** Компонент подписи поля ввода */
function Label(props: LabelPropType) {
	const { label } = props

	if (!label) return null
	return <label className='label'>{label}</label>
}

export default Label
