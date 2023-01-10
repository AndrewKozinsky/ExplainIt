import { useEffect, useState } from 'react'
import appConstants from '../../../../constants/appConstants'

export function useGetClasses(isModalOpen: boolean, extraClass: string) {
	const allClasses = getAllClasses(extraClass)

	const [modalClasses, setModalClasses] = useState(allClasses.invisible)
	const [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null)

	useEffect(function () {
		if (timerId) {
			setTimerId(null)
		}

		if (isModalOpen) {
			setModalClasses(allClasses.zoomFront)

			setTimeout(function () {
				setModalClasses(allClasses.open)
			}, 100)
		}
		else {
			setModalClasses(allClasses.zoomFront)

			const timerId = setTimeout(function () {
				setModalClasses(allClasses.invisible)
				setTimerId(null)
			}, appConstants.animationDuration)

			setTimerId(timerId)
		}
	}, [isModalOpen])

	return modalClasses
}

function getAllClasses(extraClass: string) {
	return {
		open: 'modal ' + extraClass,
		zoomFront: 'modal modal--zoomed-front ' + extraClass,
		invisible: 'modal modal--zoomed-front modal--invisible ' + extraClass
	}
}
