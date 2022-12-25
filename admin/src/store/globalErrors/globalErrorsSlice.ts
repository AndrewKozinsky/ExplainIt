import { createSlice } from '@reduxjs/toolkit'
import GlobalErrorsStoreType from './GlobalErrorsStoreType'

const initialState: GlobalErrorsStoreType.State = {
	errorMaxId: 1,
	errors: []
}

const globalErrorsSlice = createSlice({
	name: 'globalErrors',
	initialState,
	reducers: {
		// Установка объекта глобальной ошибки в массив ошибок
		setError(state, action: GlobalErrorsStoreType.SetErrorAction) {
			const newGlobalError: GlobalErrorsStoreType.GlobalError = {
				id: state.errorMaxId++,
				text: action.payload
			}

			state.errors.push(newGlobalError)
		},
		// Удаление объекта глобальной ошибки из массива ошибок
		removeError(state, action: GlobalErrorsStoreType.RemoveErrorAction) {
			state.errors = state.errors.filter(errObj => errObj.id !== action.payload)
		},
	}
})

export default globalErrorsSlice
