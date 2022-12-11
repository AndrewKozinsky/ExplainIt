import { useAppSelector } from '../store'
import ArticleStoreType from 'store/article/ArticleStoreType'

// Функция возвращает объект с выборщиками хранилища Store.article
export default function useGetArticleSelectors(): ArticleStoreType.State {
	return useAppSelector<ArticleStoreType.State>(store => store.article)
}
