import { PayloadAction } from '@reduxjs/toolkit'


namespace GlobalErrorsStoreType {
	// Состояние Хранилища
	export type State = {
		errorMaxId: GlobalErrorId
		errors: GlobalError[]
	}

	// Объект глобальной ошибки
	export type GlobalErrorId = number
	type GlobalErrorText = string

	export type GlobalError = {
		id: GlobalErrorId
		text: GlobalErrorText
	}

	// Установка объекта глобальной ошибки в массив ошибок
	export type SetErrorAction = PayloadAction<GlobalErrorText>

	// Удаление объекта глобальной ошибки из массива ошибок
	export type RemoveErrorAction = PayloadAction<GlobalErrorId>
}

export default GlobalErrorsStoreType
