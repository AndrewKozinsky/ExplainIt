import React from 'react'
import useGetModernForm from 'utils/modernForm/lib'
import { useGetFormConfig } from './fn/formConfig'
import Types from 'types/Types'
import useGetArticleSelectors from 'store/article/articleSelectors'
import './GroupForm.scss'
import Select from '../../../formElements/Select/Select'

type GroupFormPropType = {
	group: Types.Req.ProposalGroup.Group
}

function GroupForm(props: GroupFormPropType) {
	const { group } = props

	const { currentGroupId } = useGetArticleSelectors()
	const formConfig = useGetFormConfig(group.id)

	const {
		fieldAttrs,
		onSubmit,
		formHasErrors,
		commonError,
		submitStatus
	} = useGetModernForm(formConfig)

	if (!formConfig) return null

	return (
		<form onSubmit={onSubmit} className='group-form'>
			<p className='group-form__order'>{group.order}</p>
			<Select {...fieldAttrs.type} layout='horizontal' border={currentGroupId !== group.id} />
		</form>
	)
}

export default GroupForm
