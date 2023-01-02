// import React, { useContext } from 'react'
// import { StateContext } from '../Translations/fn/stateContext'
// import Button from '../../../formElements/Button/Button'
// import { useGetDeleteBlock, useGetOnSave } from './fn/main'
// import './BottomButtons.scss'

/*type BottomButtonsPropType = {
	blockId: number
}*/

// Кнопки сохранения и удаления блока перевода
/*function BottomButtons(props: BottomButtonsPropType) {
	const { blockId } = props

	const { state, setState } = useContext(StateContext)
	const saveTranslation = useGetOnSave(blockId, state)
	const deleteBlock = useGetDeleteBlock(blockId, state, setState)

	return (
		<div className='translation-bottom-buttons'>
			<Button text='Сохранить' onClick={saveTranslation} icon='btnSignSave' />
			<Button text='Удалить' onClick={deleteBlock} icon='btnSignTrash' />
		</div>
	)
}*/

// export default BottomButtons
export {}
