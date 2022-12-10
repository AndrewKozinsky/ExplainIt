/**
 * Функция получает данные, которые нужно записать в localStorage.
 * Чтобы сохранить типы полученные данные, предварительно пропускаются через JSON.stringify
 * @param {String} propName — имя свойства
 * @param {String} value — значение свойства
 */
/*export function setToLocalStorage(propName: string, value: any): void {
	const savedValue = isPrimitiveDataType(value)
		? value
		: JSON.stringify(value)

	localStorage.setItem(propName, savedValue)
}*/

/**
 * Получение из localStorage данных предварительно пропущенных через JSON.parse
 * @param {String} propName — имя свойства
 * @param {String} defaultValue — значение по умолчанию, которое будет возвращено
 * если в localStorage у запрашиваемого свойства нет значения.
 */
export function getFromLocalStorage<T>(propName: string, defaultValue?: T) : T | any {
	const value = localStorage.getItem(propName)

	if (!value && defaultValue !== undefined) {
		return defaultValue
	}

	if (value) {
		try {
			return JSON.parse(value)
		}
		catch(err) {
			return value
		}
	}
}

/**
 * Удаление данных из localStorage
 * @param {String} propName — имя свойства
 */
/*export function removeFromLocalStorage(propName: string): void {
	localStorage.removeItem(propName)
}*/

/**
 * Функция проверяет является ли переданные данные примитивного типа
 * @param {Object} val — данные, которые нужно проверить
 */
/*function isPrimitiveDataType(val: any) {
	return val !== Object(val)
}*/

export {}
