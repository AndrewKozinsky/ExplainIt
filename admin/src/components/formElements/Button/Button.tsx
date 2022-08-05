import { Loader } from 'components/common/Loading/Loading'
import React, { ReactElement } from 'react'
import SvgIcon, { SvgIconPropType, SvgIconType } from '../../icons/SvgIcon'
import makeClasses from './Button-classes'

type ButtonColorType = 'base' | 'white'

export type ButtonPropType = {
    type?: 'button' | 'submit' | 'reset'
    view?: 'standard' | 'onlyIcon'
    color?: ButtonColorType
    icon?: SvgIconType
    text?: string | ReactElement
	loading?: boolean
    block?: boolean // Должна ли кнопка быть блочным элементом на всю ширину
    onClick?: (...args: any[]) => void
    disabled?: boolean
}


/** Компонент кнопки */
export default function Button(props: ButtonPropType): ReactElement {

	let {
		type = 'button', // Тип кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		icon, // Тип значка
		text, // Текст на кнопке
		loading = false, // Нужно ли на кнопке рисовать загрузчик
		disabled = false, // Заблокирована ли кнопка
		onClick,
	} = props

	// Текст кнопки
	let btnText: null | string | ReactElement = null
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
	if (onClick) btnAttrs.onClick = onClick

	return (
		<button {...btnAttrs}>
			<ButtonIcon iconType={icon} CN={CN} />
			<ButtonLoader loading={loading} />
			{btnText}
		</button>
	)
}


type ButtonIconPropType = {
    iconType: SvgIconType | undefined // Тип значка. Если не передан, то кнопка не будет отрисована
	CN: Record<string, string>
}

/* Значок на кнопке */
function ButtonIcon(props: ButtonIconPropType) {
	const { iconType, CN } = props

	if (!iconType) return null

	const attrs: SvgIconPropType = { type: iconType }

	return <SvgIcon {...attrs} extraClass={CN.icon}  />
}


type ButtonLoaderPropType = {
    loading?: boolean // Нужно ли отрисовать загрузчик
}

/** Компонент загрузчика кнопки */
function ButtonLoader(props: ButtonLoaderPropType) {
	const { loading = false } = props

	if (!loading) return null
	return <Loader className="btn-loader"/>
}
