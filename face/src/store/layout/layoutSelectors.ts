import { useAppSelector } from '../store'
import LayoutStoreType from './LayoutStoreType'

// Функция возвращает объект с выборщиками хранилища Store.article
export default function useGetLayoutSelectors(): LayoutStoreType.State {
	return useAppSelector<LayoutStoreType.State>(store => store.layout)
}
