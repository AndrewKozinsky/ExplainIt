// import React from 'react'
// import Types from 'types/Types'
// import cn from 'classnames'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import GroupForm from '../GroupForm/GroupForm'
// import GroupButtons from '../GroupButtons/GroupButtons'
// import { getOnSelectGroup } from './Group-func'
// import './Group.scss'

/*type GroupPropType = {
	group: Types.Req.ProposalGroup.Group
}*/

/*function Group(props: GroupPropType) {
	const { group } = props

	const { currentGroupId } = useGetArticleSelectors()
	const classes = cn('group', currentGroupId == group.id && 'group--selected')
	const onSelectGroup = getOnSelectGroup(group)

	return (
		<div className={classes} onClick={onSelectGroup}>
			<GroupForm group={group} />
			<GroupButtons groupId={group.id} />
		</div>
	)
}*/

// export default Group
export {}
