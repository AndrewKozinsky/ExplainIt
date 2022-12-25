import React from 'react'
import Button from 'components/formElements/Button/Button'
import proposalGroupService from '../../../services/proposalGroup'
import useGetArticleSelectors from 'store/article/articleSelectors'
import Group from 'components/groups/Group/Group'
import './Groups.scss'

function Groups() {
	const { article } = useGetArticleSelectors()

	if (!article) {
		return null
	}

	return (
		<div className='groups'>
			Блоки упражнений
			{article.proposalsGroups.length !== 0 && <div className='groups__wrapper'>
				{article.proposalsGroups.map(group => {
					return <Group group={group} key={group.id} />
				})}
			</div>}
			<div className='groups__bottom'>
				<Button text='Добавить блок' onClick={() => {
					proposalGroupService.createGroup('oral')
				}} />
			</div>
		</div>
	)
}

export default Groups
