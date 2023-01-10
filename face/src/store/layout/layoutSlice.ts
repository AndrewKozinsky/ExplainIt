import { createSlice } from '@reduxjs/toolkit'
import LayoutStoreType from './LayoutStoreType'

const initialState: LayoutStoreType.State = {
	fixDevTools: 0, //
	mainPageZoom: 0, // на какой визуальной позиции стоит основная страница
	indexPageZoom: 1, // на какой визуальной позиции стоит страница оглавления
	exercisePageZoom: 1, // на какой визуальной позиции стоит страница упражнения
}

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		// Свойство исправляющее ошибку в Redux DevTools.
		// В новых версиях Некста нужно проверить, может это исправлено.
		fixDevTools(state) {
			state.fixDevTools++
		},
		// Установка коэффициента увеличения страницы
		setPageZoom(state, action: LayoutStoreType.SetPageZoomPayload) {
			const { page, zoom } = action.payload

			if (page == 'main') {
				state.mainPageZoom = zoom
			}
			if (page == 'index') {
				state.indexPageZoom = zoom
			}
			if (page == 'exercise') {
				state.exercisePageZoom = zoom
			}
		},
	}
})

export default layoutSlice
