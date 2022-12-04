// import { IndexListItemType } from 'components/common/IndexList/IndexList'
// import { makeCN } from 'utils/stringUtils'
// import './IndexList.scss'


/*export type DetailsType = {
	item?: IndexListItemType
	isSelected?: boolean
}*/

/**
 * Функция возвращающая классы для элементов
 * @param {Object} details — объект с параметрами влияющие на внешний вид элемента
 */
/*export default function makeClasses(details: DetailsType) {
	return {
		item: getItemClasses(details),
		itemText: 'index-list__item-text',
		controls: 'index-list__item-controls',
		control: 'index-list__item-control',
		payAtn: 'index-list__pay-atn',
		hiddenSign: getHiddenSignClasses(details),
	}
}*/

/**
 * Функция возвращает классы пункта списка
 * @param {Object} details — объект с параметрами влияющие на внешний вид элемента
 */
/*function getItemClasses(details: DetailsType ) {
	// Классы кнопки
	const classes = ['index-list__item']

	if (details.isSelected) {
		classes.push('index-list__item--selected')
	}

	return makeCN(classes)
}*/

/**
 * Функция возвращает классы пункта списка
 * @param {Object} details — объект с параметрами влияющие на внешний вид элемента
 */
/*function getHiddenSignClasses(details: DetailsType ) {
	// Классы кнопки
	const classes = ['index-list__hidden-sign']

	if (details.isSelected) {
		classes.push('index-list__hidden-sign--white')
	}

	return makeCN(classes)
}*/

export {}
