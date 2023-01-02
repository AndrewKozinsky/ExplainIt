// import { BaseSyntheticEvent, MouseEvent, useCallback, useContext } from 'react'
// import { SetWordsStateType, StateContext, WordsStateType } from './stateContext'
// import { produce } from 'immer'
// import wordService from 'services/word.service'
// import Types from 'types/Types'

// type InputTypeType = 'rusWord' | 'note' | 'engWord'

/*export function useGetOnInputChange(
	wordBlockId: number,
	inputType: InputTypeType
) {
	const { wordsState, setWordsState } = useContext(StateContext)

 	return useCallback(function (e: BaseSyntheticEvent) {
		const { value } = e.target

		changeTextInput(value, wordsState, setWordsState, wordBlockId, inputType)
	}, [wordsState])
}*/

/**
 * Удаляет вариант перевода русского предложения
 * @param {String} newValue — изменённое значение перевода предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
/*function changeTextInput(
	newValue: string,
	wordsState: WordsStateType,
	setState: SetWordsStateType,
	wordBlockId: number,
	inputType: InputTypeType
) {
	const newState = produce(wordsState, (draft) => {
		const wordBlock = draft.find(block => block.id === wordBlockId)
		if (!wordBlock) return

		if (inputType == 'rusWord') {
			wordBlock.rusWord = newValue
		}
		else if (inputType == 'note') {
			wordBlock.note = newValue
		}
		else if (inputType == 'engWord') {
			wordBlock.engWord = newValue
		}
	})

	setState(newState)
}*/

/**
 * Обработчик нажатия на кнопку удаления варианта перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
/*export function useGetDeleteWordBlock(
	wordBlockId: number
) {
	const { wordsState, setWordsState } = useContext(StateContext)

	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		const confirmed = confirm('Вы уверены в удалении слова?')

		if (confirmed) {
			wordService.deleteWord(wordBlockId).then(res => {
				removeWordBlockFromWordsStore(wordBlockId, wordsState, setWordsState)
			})
		}
	}, [wordsState])
}*/

/**
 * Удаляет блок перевода из местного состояния
 * @param {Number} blockId — id блока переводов и разбора русского предложения, который требуется удалить.
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 */
/*function removeWordBlockFromWordsStore(wordBlockId: number, wordsState: WordsStateType, setState: SetWordsStateType) {
	const newState = produce(wordsState, (draft) => {
		return draft.filter(wordBlock => wordBlock.id !== wordBlockId)
	})

	setState(newState)
}*/

/**
 * Хук возвращает обработчик сохранения всего блока перевода, который требуется удалить.
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 */
/*export function useGetWordSave( wordBlockId: number ) {
	const { wordsState, setWordsState } = useContext(StateContext)

	return useCallback(function () {
		const wordBlockDTO: Types.Req.Word.UpdateOneDto
			= createWordBlockDTO(wordBlockId, wordsState)

		wordService.requestUpdateWord(wordBlockId, wordBlockDTO)
	}, [wordsState])
}*/

/**
 * Функция создаёт из блока Состояния DTO для обновления данных перевода на сервере.
 * @param {Number} wordBlockId — id блока переводов и разбора русского предложения
 * @param {Object} wordsState — объект состояния блоков переводов русского предложения
 */
/*function createWordBlockDTO(
	wordBlockId: number,
	wordsState: WordsStateType
): Types.Req.Word.UpdateOneDto {
	const wordBlock = wordsState.find(wordBlock => wordBlock.id === wordBlockId)
	if (!wordBlock) return {}

	return {
		rusWord: wordBlock.rusWord,
		note: wordBlock.note,
		engWord: wordBlock.engWord,
	}
}*/
export {}
