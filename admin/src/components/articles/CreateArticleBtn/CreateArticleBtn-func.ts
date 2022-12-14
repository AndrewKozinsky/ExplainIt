import useGetArticleSelectors from 'store/article/articleSelectors'

export function useIsDisabled() {
	const { articles } = useGetArticleSelectors()

	return !articles
}
