// import { BaseSyntheticEvent, MouseEvent, useCallback } from 'react'
// import { SetStateType, StateType } from '../../Translations/fn/stateContext'
// import { produce } from 'immer'

// type SwitchType = 'checked' | 'correct'

/**
 * Хук возвращает обработчик изменения переключатели правильности перевода и проверено ли предложение
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {String} switchType — тип переключатели
 */
/*export function useGetOnSwitchChange(
	state: StateType,
	setState: SetStateType,
	blockId: number,
	switchType: SwitchType
) {
	return useCallback(function (e: BaseSyntheticEvent) {
		const { checked } = e.target

		changeSwitch(state, setState, blockId, checked, switchType)
	}, [state])
}*/

/**
 * Функция изменяет текстовое поле анализа перевода русского предложения.
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Boolean} checked — отмечен ли переключатель
 * @param {String} switchType — тип переключателя
 */
/*function changeSwitch(
	state: StateType,
	setState: SetStateType,
	blockId: number,
	checked: boolean,
	switchType: SwitchType
) {
	const newState = produce(state, (draft) => {
		const block = draft.blocks.find(block => block.id === blockId)
		if (!block) return

		if (switchType == 'checked') {
			block.isChecked = checked
		}
		else if (switchType == 'correct') {
			block.isCorrect = checked
		}
	})

	setState(newState)
}*/
export {}
