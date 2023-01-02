// import React, { useContext } from 'react'
// import { State } from '../Translations/fn/useGetState'
// import Button from '../../../formElements/Button/Button'
// import TextInput from '../../../formElements/TextInput/TextInput'
// import { useGetAddEngProposal, useGetDeleteEngProposal, useGetOnInputChange } from './fn/main'
// import { StateContext } from '../Translations/fn/stateContext'
// import './EngProposals.scss'

/*type EngProposalsPropType = {
	blockId: number
	engProposals: State.EngProposal[]
}*/

/*function EngProposals(props: EngProposalsPropType) {
	const { blockId, engProposals } = props

	const { state, setState } = useContext(StateContext)
	const addEngProposal = useGetAddEngProposal(state, setState, blockId)

	return (
		<div className='eng-proposals'>
			<div className='eng-proposals__rows'>
				{engProposals.map((proposalObj, i) => {
					return <Row blockId={blockId} proposalObj={proposalObj} key={proposalObj.id} />
				})}
			</div>
			<Button
				text='Добавить перевод'
				onClick={addEngProposal}
				extraClass='eng-proposals__add-btn' />
		</div>
	)
}*/

// export default EngProposals

/*type RowPropType = {
	blockId: number
	proposalObj: State.EngProposal
}*/

// Ряд с текстом необработанного предложения и кнопкой удаления
/*function Row(props: RowPropType) {
	const { blockId, proposalObj } = props

	const { state, setState } = useContext(StateContext)

	const onInputChange = useGetOnInputChange(state, setState, blockId, proposalObj)
	const deleteEngProposal = useGetDeleteEngProposal(state, setState, blockId, proposalObj)

	return (
		<div className='eng-proposals__row'>
			<TextInput mValue={proposalObj.proposal} mOnChange={onInputChange} />
			<Button view='onlyIcon' icon='btnSignTrash' onClick={deleteEngProposal} />
		</div>
	)
}*/
export {}
