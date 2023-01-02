// import React from 'react'
// import Header from '../common/Header/Header'
// import { StateContext } from './fn/stateContext'
// import { WordObjType, useGetState } from './fn/useGetState'
// import Button from '../formElements/Button/Button'
// import { useGetAddWordBlock } from './fn/addWord'
// import SmallContentWrapper from '../common/Blocks/SmallContentWrapper/SmallContentWrapper'
// import TextInput from '../formElements/TextInput/TextInput'
// import { useGetDeleteWordBlock, useGetOnInputChange, useGetWordSave } from './fn/main'
// import './Words.scss'

/*function Words() {
	const { wordsState, setWordsState } = useGetState()

	return (
		<StateContext.Provider value={{ wordsState, setWordsState }}>
			<div>
				<Header text='Слова' />
				{wordsState.map(wordObj => {
					return <WordBlock wordObj={wordObj} key={wordObj.id} />
				})}
				<AddTranslation />
			</div>
		</StateContext.Provider>
	)
}*/

// export default Words


/*type WordBlockPropType = {
	wordObj: WordObjType
}*/

// Ряд с текстом недопустимого предложения и кнопкой удаления
/*function WordBlock(props: WordBlockPropType) {
	const { wordObj } = props

	const onRusWordInputChange = useGetOnInputChange(wordObj.id, 'rusWord')
	const onNoteInputChange = useGetOnInputChange(wordObj.id, 'note')
	const onEngWordInputChange = useGetOnInputChange(wordObj.id, 'engWord')

	const saveWordBlock = useGetWordSave(wordObj.id)
	const deleteWordBlock = useGetDeleteWordBlock(wordObj.id)

	return (
		<SmallContentWrapper>
			<div className='words__block-form'>
				<TextInput mValue={wordObj.rusWord} mOnChange={onRusWordInputChange} label='Русское слово' />
				<TextInput mValue={wordObj.note} mOnChange={onNoteInputChange} label='Примечание' />
				<TextInput mValue={wordObj.engWord} mOnChange={onEngWordInputChange} label='Перевод' />
			</div>
			<div className='words__block-bottom'>
				<Button text='Сохранить' onClick={saveWordBlock} icon='btnSignSave' />
				<Button text='Удалить' onClick={deleteWordBlock} icon='btnSignTrash' />
			</div>
		</SmallContentWrapper>
	)
}*/

/*function AddTranslation() {
	const addWordBlock = useGetAddWordBlock()

	return (
		<div className='words__add-word-block'>
			<Button
				text='Добавить слово'
				onClick={addWordBlock}
			/>
		</div>
	)
}*/
export {}
