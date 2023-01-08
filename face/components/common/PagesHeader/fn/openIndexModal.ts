import { useCallback } from 'react'
import store from '../../../../store/store'
import layoutSlice from '../../../../store/layout/layoutSlice'

export function useGetOpenIndexModal() {
	return useCallback(function () {
		store.dispatch(
			layoutSlice.actions.setPageZoom(
				{ page: 'main', zoom: -1 }
			)
		)
	}, [])
}
