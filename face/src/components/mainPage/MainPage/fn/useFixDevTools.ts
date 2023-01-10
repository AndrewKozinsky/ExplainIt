import { useEffect } from 'react'
import store from '../../../../store/store'
import layoutSlice from '../../../../store/layout/layoutSlice'

/** Хук исправляющий ошибку в Redux DevTools. В новых версиях Некста нужно проверить может это исправлено. */
export function useFixDevTools() {
	useEffect(function () {
		let counter = 0

		const intervalId = setInterval(function () {
			counter++

			store.dispatch(layoutSlice.actions.fixDevTools())

			if (counter > 1) {
				clearInterval(intervalId)
			}
		}, 300)
	}, [])
}
