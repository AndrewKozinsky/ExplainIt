import { BaseSyntheticEvent, MouseEvent, useCallback } from 'react'
import { SetStateType, StateType } from '../../Translations/fn/stateContext'
import { produce } from 'immer'

/**
 * Хук возвращает обработчик изменения текстового поля анализа перевода русского предложения.
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
export function useGetOnInputChange(
	state: StateType,
	setState: SetStateType,
	blockId: number,
) {
	return useCallback(function (e: BaseSyntheticEvent) {
		const { value } = e.target

		changeTextarea(value, state, setState, blockId)
	}, [state])
}

/**
 * Функция изменяет текстовое поле анализа перевода русского предложения.
 * @param {String} newValue — изменённое значение перевода предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
function changeTextarea(
	newValue: string,
	state: StateType,
	setState: SetStateType,
	blockId: number,
) {
	const newState = produce(state, (draft) => {
		const block = draft.blocks.find(block => block.id === blockId)
		if (!block) return

		block.analysis = newValue
	})

	setState(newState)
}
