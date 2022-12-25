import React, { ReactElement } from 'react'
import { Loader } from 'components/common/Loading/Loading'
import SvgIcon, { SvgIconPropType, SvgIconType } from '../../common/icons/SvgIcon'
import makeClasses from './Button-classes'

export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset' // Что будет записано в свойстве type
    view?: 'standard' | 'onlyIcon' // Кнопка с текстом или
    border?: boolean // Должна ли быть рамка?
    icon?: SvgIconType
    text?: string
	loading?: boolean
    block?: boolean // Должна ли кнопка быть блочным элементом на всю ширину
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
}

/** Компонент кнопки */
export default function Button(props: ButtonPropType): ReactElement {

	let {
		type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		border = true,
		icon, // Тип значка
		text, // Текст на кнопке
		loading = false, // Нужно ли на кнопке рисовать загрузчик
		disabled = false, // Заблокирована ли кнопка
		onClick,
	} = props

	// Текст кнопки
	let btnText: null | string = null
	if (view !== 'onlyIcon' && text) btnText = text

	// При загрузке поменять текст кнопки
	if (btnText && loading) {
		btnText = 'Отправка...'
	}

	// Если включена загрузка, то заблокировать кнопку и убрать значок
	if (loading) {
		disabled = true
		icon = undefined
	}

	const CN = makeClasses(props)

	// Атрибуты кнопки
	const btnAttrs: Record<string, any> = {
		type,
		className: CN.root,
		disabled
	}

	if (onClick) {
		btnAttrs.onClick = onClick
	}

	return (
		<button {...btnAttrs}>
			{icon && <ButtonIcon iconType={icon} CN={CN} />}
			{loading && <Loader className="btn-loader"/>}
			{btnText}
		</button>
	)
}

type ButtonIconPropType = {
    iconType: SvgIconType // Тип значка. Если не передан, то кнопка не будет отрисована
	CN: Record<string, string>
}

/* Значок на кнопке */
function ButtonIcon(props: ButtonIconPropType) {
	const { iconType, CN } = props

	const attrs: SvgIconPropType = {
		type: iconType,
		extraClass: CN.icon
	}

	return <SvgIcon {...attrs} />
}
