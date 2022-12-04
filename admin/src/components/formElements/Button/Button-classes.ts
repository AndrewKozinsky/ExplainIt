// import { makeCN } from 'utils/stringUtils'
// import { ButtonPropType } from './Button'
// import './Button.scss'

// const CN = 'btn'

/** Функция возвращающая классы для элементов */
/*export default function makeClasses(buttonProps: ButtonPropType) {
	return {
		root: getButtonClasses(buttonProps),
		btnIcon: CN + '__icon'
	}
}*/

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
/*export function getButtonClasses(buttonProps: ButtonPropType) {
	const {
		// view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		color = 'base', // Цвет кнопки. Варианты: base (стандартный цвет), accent (акцентный цвет)
		block
	} = buttonProps

	// Классы кнопки
	const classes = [CN]

	// Цвет кнопки.
	// white (белый цвет)
	if (color === 'white') classes.push(`${CN}--white-color`)

	// Если кнопка должна быть блочным элементом на всю ширину
	if (block) classes.push(`${CN}--block`)

	return makeCN(classes)
}*/

export {}
