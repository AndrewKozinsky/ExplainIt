import { BaseSyntheticEvent, MouseEvent, useCallback, useContext } from 'react'
import { produce } from 'immer'
import { SetStateType, StateContext, StateType } from './stateContext'
import Types from 'types/Types'
import writingProposalService from 'services/writingProposal.service'
import useGetArticleSelectors from 'store/article/articleSelectors'

export function useGetOnInputChange(
	state: StateType,
	setState: SetStateType,
	translationId: number
) {
	return useCallback(function (e: BaseSyntheticEvent) {
		const { value } = e.target

		changeTranslation(value, state, setState, translationId)
	}, [state])
}

/**
 * Удаляет вариант перевода русского предложения
 * @param {String} newValue — изменённое значение перевода предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
function changeTranslation(
	newValue: string,
	state: StateType,
	setState: SetStateType,
	translationId: number
) {
	const newState = produce(state, (draft) => {
		const block = draft.find(block => block.id === translationId)
		if (!block) return

		block.text = newValue
	})

	setState(newState)
}

/**
 * Обработчик нажатия на кнопку удаления варианта перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
export function useGetDeleteEngProposal(
	state: StateType,
	setState: SetStateType,
	translationId: number
) {
	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		const confirmed = confirm('Вы уверены в удалении перевода?')

		if (confirmed) {
			deleteTranslation(state, setState, translationId)
		}
	}, [state])
}

/**
 * Удаляет вариант перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} proposalObj — объект перевода русского предложения
 */
function deleteTranslation(
	state: StateType,
	setState: SetStateType,
	translationId: number
) {
	const newState = produce(state, (draft) => {
		return draft.filter(translationObj => {
			return translationObj.id !== translationId
		})
	})

	setState(newState)
}

/**
 * Обработчик нажатия на кнопку добавления варианта перевода русского предложения
 */
export function useGetAddTranslation() {
	const { state, setState } = useContext(StateContext)

	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		addTranslation(state, setState)
	}, [state])
}

/**
 * Добавляет вариант перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
function addTranslation(
	state: StateType,
	setState: SetStateType
) {
	const newState = produce(state, (draft) => {
		const maxId = draft.reduce((maxId, translationObj) => {
			return translationObj.id > maxId ? translationObj.id : maxId
		}, 0)

		draft.push({
			id: maxId + 1,
			text: ''
		})
	})

	setState(newState)
}

/**
 * Хук возвращает обработчик сохранения всего блока перевода, который требуется удалить.
 */
export function useGetOnSave() {
	const { currentProposalId } = useGetArticleSelectors()

	const { state } = useContext(StateContext)

	return useCallback(function () {
		if (!currentProposalId) return

		const translatesArr = state.map(proposal => proposal.text)
		writingProposalService.updateBadTranslations(currentProposalId, translatesArr)
	}, [state])
}
