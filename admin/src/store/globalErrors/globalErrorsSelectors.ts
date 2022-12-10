import { useAppSelector } from '../store'
import GlobalErrorsStoreType from './GlobalErrorsStoreType'

// Функция возвращает объект с выборщиками хранилища Store.globalErrors
export default function useGetGlobalErrorsSelectors(): GlobalErrorsStoreType.State {
	return useAppSelector<GlobalErrorsStoreType.State>(store => store.globalErrors)
}
