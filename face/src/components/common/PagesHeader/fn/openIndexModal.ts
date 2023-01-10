import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import layoutSlice from '../../../../store/layout/layoutSlice'

export function useGetOpenIndexModal() {
	const dispatch = useDispatch()

	return useCallback(function () {
		dispatch(
			layoutSlice.actions.setPageZoom(
				{ page: 'main', zoom: -1 }
			)
		)
		dispatch(
			layoutSlice.actions.setPageZoom(
				{ page: 'index', zoom: 0 }
			)
		)
	}, [])
}
