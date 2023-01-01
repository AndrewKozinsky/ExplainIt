import { useCallback } from 'react'
import translationService from 'services/translation.service'
import { SetStateType, StateType } from '../../Translations/fn/stateContext'
import { produce } from 'immer'
import useGetArticleSelectors from 'store/article/articleSelectors'
import store from 'store/store'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import translationRequests from 'requests/translationRequests'
import { createStateBlockItemFromTranslation } from '../../Translations/fn/useGetState'

/**
 * Хук возвращает обработчик добавления нового блока перевода
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
export function useGetAddTranslationBlock(state: StateType, setState: SetStateType) {
	const { currentProposalId } = useGetArticleSelectors()

	return useCallback(function () {
		if (!currentProposalId) return

		addTranslationBlock(currentProposalId, state, setState)
	}, [state])
}

/**
 * Удаляет блок перевода из местного состояния.
 * @param {Number} proposalId — id предложения, к которому прикрепляется перевод.
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
async function addTranslationBlock(proposalId: number, state: StateType, setState: SetStateType) {
	const reqBody = translationService.createAddTranslationDto(proposalId)
	const response = await translationRequests.createOne(reqBody)

	if (response.status === 'success') {
		const newState = produce(state, (draft) => {
			const translateStateItem = createStateBlockItemFromTranslation(response.data.translates)
			draft.blocks.push(translateStateItem)
		})

		setState(newState)
	}
	else {
		store.dispatch(globalErrorsSlice.actions.setError(response.message))
	}
}
