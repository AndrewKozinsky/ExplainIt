// import iconsCollector from './getIcon'


/**
 * Функция возвращает объект с размерами значка в SVG в зависимости от переданного типа.
 * @param {String} type — тип значка.
 */
/*export function getIconRowSize(type: keyof typeof iconsCollector) {
	switch (type) {
		// Логотип редактора
		case 'btnSignUp':
		case 'btnSignDown':
			return {
				width: 16,
				height: 19,
			}
		case 'btnSignSave':
		case 'btnSignTrash':
			return {
				width: 15,
				height: 19,
			}
		case 'hidden':
			return {
				width: 20,
				height: 16,
			}
		default: {
			const _: never = type
			return {
				width: 0,
				height: 0,
			}
		}
	}
}*/


/**
 * Функция возвращает атрибуты с полными размерами значка в SVG.
 * В зависимости от типа значка будут возвращены разные названия размеры
 * @param {String} type — тип значка.
 */
/*export function getIconSize(type: keyof typeof iconsCollector) {
	const rowIconSizeObj = getIconRowSize(type)

	return {
		width: rowIconSizeObj.width + 'px',
		height: rowIconSizeObj.height + 'px',
		viewBox: `0 0 ${rowIconSizeObj.width} ${rowIconSizeObj.height}`
	}
}*/

export {}
