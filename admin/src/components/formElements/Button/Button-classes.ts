import cn from 'classnames'
import { ButtonPropType } from './Button'
import './Button.scss'

const CN = 'btn'

/** Функция возвращающая классы для элементов */
export default function makeClasses(buttonProps: ButtonPropType) {
	return {
		root: getButtonClasses(buttonProps),
		icon: getIconClasses(buttonProps)
	}
}

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
function getButtonClasses(buttonProps: ButtonPropType) {
	const {
		view = 'standard', // Вид кнопки. Варианты: standard (стандартная кнопка), onlyIcon (только значок)
		border = true, // Должна ли быть рамка у кнопки
		block
	} = buttonProps

	// Классы кнопки
	const classes = [CN]

	if (border) {
		classes.push(`${CN}--border-color`)
	}

	// Если кнопка должна быть блочным элементом на всю ширину
	if (block) classes.push(`${CN}--block`)

	return cn(classes)
}

/**
 * Функция возвращает классы кнопки
 * @param {Object} buttonProps — props переданные в кнопку
 */
function getIconClasses(buttonProps: ButtonPropType) {
	const { text } = buttonProps

	// Классы кнопки
	const classes = [CN + '__icon']

	if (!!text) {
		classes.push(`${CN}__icon--right-offset`)
	}

	return cn(classes)
}
