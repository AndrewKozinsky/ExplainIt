import { PayloadAction } from '@reduxjs/toolkit'

namespace LayoutStoreType {
	// Состояние Хранилища
	export type State = {
		fixDevTools: number
		mainPageZoom: PageZoom
		indexPageZoom: PageZoom
		exercisePageZoom: PageZoom
	}

	// На какой визуальной позиции должна стоять страница:
	// 1 (ближе к зрителю), 0 (соответствует экрану) или -1 (в отдалении)
	type PageZoom = 1 | 0 | -1

	// Установка масштаба указанной страницы для плавного увеличения или уменьшения
	export type SetPageZoom = { page: 'main' | 'index' | 'exercise', zoom: PageZoom }
	export type SetPageZoomPayload = PayloadAction<SetPageZoom>
}

export default LayoutStoreType
