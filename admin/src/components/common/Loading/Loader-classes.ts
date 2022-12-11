import { makeCN } from 'utils/stringUtils'
import './Loading.scss'


/** Функция возвращающая классы для элементов */
export default function makeClasses(isLoading: boolean, loaderExtClasses?: string) {
	return {
		contentRoot: 'content-loading',
		contentCover: getContentCoverClasses(isLoading),

		loaderRoot: getLoaderRootClass(loaderExtClasses),
		loaderSvg: 'loader__svg',
	}
}

function getContentCoverClasses(isLoading: boolean) {
	const classes = ['content-loading__cover']
	if (isLoading) {
		classes.push('content-loading__cover--open')
	}

	return classes.join(' ')
}

/**
 * Функция формирует классы обёртки загрузчика
 * @param {String} externalClasses — дополнительные классы, которые нужно добавить обёртке.
 */
function getLoaderRootClass(externalClasses?: string) {
	const classes = ['loader__wrapper']

	if (externalClasses) {
		classes.push(externalClasses)
	}

	return makeCN(classes)
}
