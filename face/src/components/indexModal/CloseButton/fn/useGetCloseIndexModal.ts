import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import layoutSlice from '../../../../store/layout/layoutSlice'

export function useGetCloseIndexModal() {
	const dispatch = useDispatch()

	return useCallback(function () {
		dispatch(
			layoutSlice.actions.setPageZoom(
				{ page: 'main', zoom: 0 }
			)
		)
		dispatch(
			layoutSlice.actions.setPageZoom(
				{ page: 'index', zoom: 1 }
			)
		)
	}, [])
}
