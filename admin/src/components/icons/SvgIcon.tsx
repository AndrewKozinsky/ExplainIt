import React from 'react'
import iconsCollector from './js/getIcon'
import { getIconSize } from './js/getIconSize'
import './css/SvgIcon.scss'


export type SvgIconType = keyof typeof iconsCollector

export type SvgIconPropType = {
	type: SvgIconType // Тип значка
	extraClass?: string // Дополнительный класс значка
}

/** Значок */
export default function SvgIcon(props: SvgIconPropType) {

	const {
		type, // Тип значка
		extraClass = '' // Дополнительный класс значка
	} = props

	// Значок
	const Icon = iconsCollector[type]

	// Размеры
	const iconSizes = getIconSize(type)

	// Классы
	let className = 'icon'
	if (extraClass) className += ' ' + extraClass

	return (
		<svg {...iconSizes} className={className}>
			<Icon/>
		</svg>
	)
}
