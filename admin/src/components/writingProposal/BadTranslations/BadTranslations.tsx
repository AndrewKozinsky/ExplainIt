// import React, { useContext } from 'react'
// import { StateContext } from './fn/stateContext'
// import Header from '../../common/Header/Header'
// import { BadTranslationType, useGetState } from './fn/useGetState'
// import SmallContentWrapper from '../../common/Blocks/SmallContentWrapper/SmallContentWrapper'
// import {
// 	useGetAddTranslation,
// 	useGetDeleteEngProposal,
// 	useGetOnInputChange,
// 	useGetOnSave
// } from './fn/main'
// import TextInput from '../../formElements/TextInput/TextInput'
// import Button from '../../formElements/Button/Button'
// import './BadTranslations.scss'

/*function BadTranslations() {
	const { state, setState } = useGetState()

	return (
		<StateContext.Provider value={{ state, setState }}>
			<div>
				<Header text='Нечего обсуждать' />
				<SmallContentWrapper extraClass='bad-translations__wrapper'>
					<div className='bad-translations__inputs'>
						{state.map((badTranslationObj, i) => {
							return <Row badTranslationObj={badTranslationObj} key={badTranslationObj.id}/>
						})}
					</div>
					<div className='bad-translations__bottom'>
						<AddTranslationButton />
						<SaveButton />
					</div>
				</SmallContentWrapper>
			</div>
		</StateContext.Provider>
	)
}*/

// export default BadTranslations


/*type RowPropType = {
	badTranslationObj: BadTranslationType
}*/

// Ряд с текстом недопустимого предложения и кнопкой удаления
/*function Row(props: RowPropType) {
	const { badTranslationObj } = props

	const { state, setState } = useContext(StateContext)

	const onInputChange = useGetOnInputChange(state, setState, badTranslationObj.id)
	const deleteTranslation = useGetDeleteEngProposal(state, setState, badTranslationObj.id)

	return (
		<div className='eng-proposals__row'>
			<TextInput mValue={badTranslationObj.text} mOnChange={onInputChange} />
			<Button view='onlyIcon' icon='btnSignTrash' onClick={deleteTranslation} />
		</div>
	)
}*/

/*function AddTranslationButton() {
	const addTranslation = useGetAddTranslation()

	return (
		<Button text='Добавить перевод' onClick={addTranslation} />
	)
}*/

// Переключатели правильности перевода и проверено ли предложение
/*function SaveButton() {
	const saveTranslation = useGetOnSave()

	return (
		<div className='translation-bottom-buttons'>
			<Button text='Сохранить' onClick={saveTranslation} icon='btnSignSave' />
		</div>
	)
}*/
export {}
