import store from 'store/store'
import { getFromLocalStorage, setToLocalStorage } from 'utils/miscUtils'
import articleSlice from 'store/article/articleSlice'

// Названия свойств сохранённых в LocalStorage.
// В них сохраняются различные данные нужные для восстановления Хранилища после перезагрузке страницы.
const localStorageAppProps = { articleId: true }

/**
 * Функция сохраняет в LocalStorage данные для восстановления Хранилища после перезагрузки страницы.
 * @param {String} propName — название свойства для сохранения в LocalStorage.
 * @param {String} value — значение сохраняемого свойства.
 */
export function saveAppDataToLocalStorage(propName: keyof typeof localStorageAppProps, value: any) {
	setToLocalStorage(propName, value)
}

/**
 * Функция восстанавливает данные Хранилища после перезагрузки страницы.
 */
export function restoreStateFromLocalStorage() {
	for (let prop in localStorageAppProps) {
		const propValue = getFromLocalStorage(prop)

		if (prop === 'articleId') {
			store.dispatch(
				articleSlice.actions.setArticleId(propValue)
			)
		}
	}
}
