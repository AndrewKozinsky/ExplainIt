// import { useCallback, useContext } from 'react'
// import { produce } from 'immer'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import store from 'store/store'
// import wordService from 'services/word.service'
// import Types from 'types/Types'
// import wordRequests from 'requests/wordRequests'
// import { createWordBlockItemFromWord } from './useGetState'
// import { SetWordsStateType, StateContext, WordsStateType } from './stateContext'
// import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'

/** Хук возвращает обработчик добавления нового блока перевода */
/*export function useGetAddWordBlock() {
	const { currentProposalId, currentGroupType } = useGetArticleSelectors()
	const { wordsState, setWordsState } = useContext(StateContext)

	return useCallback(function () {
		if (!currentProposalId || !currentGroupType) return

		addWordBlock(currentProposalId, currentGroupType, wordsState, setWordsState)
	}, [wordsState])
}*/

/**
 * Удаляет блок перевода из местного состояния.
 * @param {Number} proposalId — id предложения, к которому прикрепляется перевод.
 * @param groupType
 * @param wordsState
 * @param setWordsState
 */
/*async function addWordBlock(
	proposalId: number,
	groupType: Types.Entity.Group.GroupType,
	wordsState: WordsStateType,
	setWordsState: SetWordsStateType
) {
	const reqBody = wordService.createAddWordDto(proposalId, groupType)
	const response = await wordRequests.createOne(reqBody)

	if (response.status === 'success') {
		const newState = produce(wordsState, (draft) => {
			const wordStateItem = createWordBlockItemFromWord(response.data.words)
			draft.push(wordStateItem)
		})

		setWordsState(newState)
	}
	else {
		store.dispatch(globalErrorsSlice.actions.setError(response.message))
	}
}*/
export {}
