// import { useCallback } from 'react'
// import { produce } from 'immer'
// import Types from 'types/Types'
// import { SetStateType, StateType } from '../../Translations/fn/stateContext'
// import translationService from 'services/translation.service'

/**
 * Хук возвращает обработчик сохранения всего блока перевода, который требуется удалить.
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 */
/*export function useGetOnSave( blockId: number, state: StateType ) {
	return useCallback(function () {
		const translateBlockDTO: Types.Req.Translation.UpdateOneDto
			= createTranslateBlockDTO(blockId, state)

		translationService.requestUpdateTranslation(blockId, translateBlockDTO)
	}, [state])
}*/

/**
 * Функция создаёт из блока Состояния DTO для обновления данных перевода на сервере.
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 */
/*function createTranslateBlockDTO(
	blockId: number, state: StateType
): Types.Req.Translation.UpdateOneDto {
	const block = state.blocks.find(block => block.id === blockId)
	if (!block) return {}

	return {
		analysis: block.analysis,
		translations: block.engProposals.map(proposal => proposal.proposal),
		correct: block.isCorrect,
		checked: block.isChecked
	}
}*/

/**
 * Хук возвращает обработчик удаление всего блока перевода
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
/*export function useGetDeleteBlock( blockId: number, state: StateType, setState: SetStateType) {
	return useCallback(function () {
		const confirmed = confirm('Вы уверены в удалении английского варианта перевода предложения?')

		if (confirmed) {
			translationService.deleteTranslation(blockId).then(res => {
				removeTranslationBlockFromLocalStore(blockId, state, setState)
			})
		}
	}, [state])
}*/

/**
 * Удаляет блок перевода из местного состояния
 * @param {Number} blockId — id блока переводов и разбора русского предложения, который требуется удалить.
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
/*function removeTranslationBlockFromLocalStore(blockId: number, state: StateType, setState: SetStateType) {
	const newState = produce(state, (draft) => {
		draft.blocks = draft.blocks.filter(block => block.id !== blockId)
	})

	setState(newState)
}*/
export {}
