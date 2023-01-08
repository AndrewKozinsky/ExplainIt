import { createSlice } from '@reduxjs/toolkit'
import LayoutStoreType from './LayoutStoreType'

const initialState: LayoutStoreType.State = {
	mainPageZoom: 0, // на какой визуальной позиции стоит основная страница
	indexPageZoom: 1, // на какой визуальной позиции стоит страница оглавления
	exercisePageZoom: 1, // на какой визуальной позиции стоит страница упражнения
}

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		// Установка id активной статьи
		setPageZoom(state, action: LayoutStoreType.SetPageZoomPayload) {
			const { page, zoom } = action.payload

			if (page == 'main') {
				state.mainPageZoom = zoom
			}
			else if (page == 'index') {
				state.indexPageZoom = zoom
			}
			else if (page == 'exercise') {
				state.exercisePageZoom = zoom
			}
		},
	}
})

export default layoutSlice
