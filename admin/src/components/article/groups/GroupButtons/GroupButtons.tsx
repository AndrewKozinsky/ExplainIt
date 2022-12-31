import React from 'react'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Button from '../../../formElements/Button/Button'
import { useGetDeleteGroupFn, useGetMoveGroupFn, useIsMoveButtonActive } from './GroupButtons-func'
import './GroupButtons.scss'

type GroupButtonsPropType = {
	groupId: number
}

function GroupButtons(props: GroupButtonsPropType) {
	const { groupId } = props
	const { currentGroupId } = useGetArticleSelectors()

	const moveUp = useGetMoveGroupFn(groupId, 'up')
	const moveDown = useGetMoveGroupFn(groupId, 'down')
	const deleteGroup = useGetDeleteGroupFn(groupId)

	const isMoveUpBtnActive = useIsMoveButtonActive(groupId, 'up')
	const isMoveDownBtnActive = useIsMoveButtonActive(groupId, 'down')

	return (
		<div className='group-buttons'>
			<Button
				icon='btnSignUp'
				onClick={moveUp}
				border={currentGroupId !== groupId}
				disabled={!isMoveUpBtnActive}
			/>
			<Button
				icon='btnSignDown'
				onClick={moveDown}
				border={currentGroupId !== groupId}
				disabled={!isMoveDownBtnActive}
			/>
			<Button
				icon='btnSignTrash'
				onClick={deleteGroup}
				border={currentGroupId !== groupId}
			/>
		</div>
	)
}

export default GroupButtons
