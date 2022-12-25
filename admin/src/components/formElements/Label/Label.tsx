import React from 'react'
import cn from 'classnames'
import './Label.scss'

type LabelPropType = {
	label?: string // Текст подписи
	layout?: 'vertical' | 'horizontal' // Расположение поля и подписи
}

/** Компонент подписи поля ввода */
function Label(props: LabelPropType) {
	const { label, layout = 'vertical' } = props
	if (!label) return null

	const classes = ['label']
	if (layout == 'vertical') {
		classes.push('label--vertical')
	}
	else if (layout == 'horizontal') {
		classes.push('label--horizontal')
	}

	return <label className={cn(classes)}>{label}</label>
}

export default Label
