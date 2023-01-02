// import React from 'react'
// import useGetModernForm from 'utils/modernForm/lib'
// import { useGetFormConfig } from './fn/formConfig'
// import TextInput from '../../formElements/TextInput/TextInput'
// import Toggle from '../../formElements/Toggle/Toggle'
// import Button from '../../formElements/Button/Button'
// import ErrorMessage from '../../formElements/ErrorMessage/ErrorMessage'

// Форма редактирования голосового предложения
/*function OralProposalForm() {
	const formConfig = useGetFormConfig()

	const {
		fieldAttrs,
		onSubmit,
		formHasErrors,
		commonError,
		submitStatus
	} = useGetModernForm(formConfig)

	return (
		<>
			<form onSubmit={onSubmit} className='article-form'>
				<TextInput {...fieldAttrs.rusProposal} label='Предложение' />
				<TextInput {...fieldAttrs.note} label='Примечание' />
				<TextInput {...fieldAttrs.engProposal} label='Перевод' />
				<Toggle {...fieldAttrs.published} label='Опубликовано' />
				<div className='article-form__bottom'>
					<Button
						text='Сохранить'
						icon='btnSignSave'
						type='submit'
						loading={submitStatus == 'pending'}
					/>
				</div>
			</form>
			{commonError && <ErrorMessage text={commonError} />}
		</>
	)
}*/

// export default OralProposalForm
export {}
