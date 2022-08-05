import { getFromLocalStorage } from 'utils/miscUtils'
import { useEffect, useState } from 'react'

/**
 * Хук проверяет можно ли пользователю смотреть административную часть.
 */
export function useIsEnterAllow() {
	const [isAllow, setIsAllow] = useState(false)

	useEffect(function () {
		setIsAllow(isEnterAllow())
	}, [])

	return isAllow
}

/**
 * Функция проверяет разрешён ли вход в административную часть
 */
function isEnterAllow(): boolean {
	const adminPassword = getFromLocalStorage('admin-password')

	return adminPassword === 'ztpmftw4PO'
}

