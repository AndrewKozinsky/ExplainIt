import React, { MouseEvent, useCallback, useMemo } from 'react'
import proposalGroupService from '../../../services/proposalGroup'
import useGetArticleSelectors from 'store/article/articleSelectors'
import store from 'store/store'

/**
 * Обработчик нажатия на кнопку перемещения группы предложений
 * @param {Number} groupId — id группы предложений
 * @param {String} destination — направление перемещения группы предложений
 */
export function useGetMoveGroupFn(groupId: number, destination: 'up' | 'down') {
	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()

		proposalGroupService.changeOrder(groupId, destination)
	}, [])
}

/**
 * Хук возвращает булево значение должна ли кнопка перемещения группы быть активной
 * @param {Number} groupId — id группы предложений
 * @param {String} destination — направление перемещения группы предложений
 */
export function useIsMoveButtonActive(groupId: number, destination: 'up' | 'down') {
	const { article } = useGetArticleSelectors()

	return useMemo(function () {
		if (!article) return true
		const groups = article.proposalsGroups

		return proposalGroupService.canChangeOrder(groups, groupId, destination)
	}, [article])
}

/**
 * Обработчик нажатия на кнопку удаления группы предложений
 * @param {Number} groupId — id группы предложений
 */
export function useGetDeleteGroupFn(groupId: number) {
	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		e.stopPropagation()

		const confirmed = confirm('Вы уверены в удалении группы?')

		if (confirmed) {
			proposalGroupService.delete(groupId)
		}
	}, [])
}
