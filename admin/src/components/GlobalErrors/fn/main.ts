import { useDispatch } from 'react-redux'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import GlobalErrorsStoreType from 'store/globalErrors/GlobalErrorsStoreType'

/**
 * Хук возвращает функцию удаляющую сообщение о глобальной ошибке из Хранилища.
 * @param {Number} errId — id ошибки
 */
export function useGetOnCloseError(errId: GlobalErrorsStoreType.GlobalErrorId) {
	const dispatch = useDispatch()

	return () => {
		dispatch(globalErrorsSlice.actions.removeError(errId))
	}
}
