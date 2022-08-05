// ФУНКЦИИ ДЛЯ РАБОТЫ СО СТРОКАМИ

/**
 * Функция принимает массив строк и формирует из них
 * строку разделённую пробелами для формирования классов CSS.
 * @param {Array} classesArr
 */
export function makeCN(classesArr: string[]): string {
	// Сформировать новый массив классов без пустых значений
	const filteredClassesArr = classesArr.filter(cls => {
		return (cls && cls !== '')
	})

	// Составить строку из массива строк
	return filteredClassesArr.join(' ')
}
