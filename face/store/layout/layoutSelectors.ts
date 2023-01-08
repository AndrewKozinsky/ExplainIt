import { useAppSelector } from '../store'
import LayoutStoreType from './LayoutStoreType'

// Функция возвращает объект с выборщиками хранилища Store.article
export default function useGetArticleSelectors(): LayoutStoreType.State {
	return useAppSelector<LayoutStoreType.State>(store => store.layout)
}
