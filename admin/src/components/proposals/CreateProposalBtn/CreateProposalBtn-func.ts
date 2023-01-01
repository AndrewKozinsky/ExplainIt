import useGetArticleSelectors from 'store/article/articleSelectors'

// Хук возвращает булево значение должна ли быть заблокирована кнопка создания новой статьи
export function useIsDisabled() {
	const { currentGroupId } = useGetArticleSelectors()
	return !currentGroupId
}