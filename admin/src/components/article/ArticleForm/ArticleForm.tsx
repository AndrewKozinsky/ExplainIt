import React from 'react'
import useGetModernForm from 'utils/modernForm/lib'
import { useGetFormConfig } from './fn/formConfig'
import TextInput from '../../formElements/TextInput/TextInput'
import Button from '../../formElements/Button/Button'
import ErrorMessage from '../../formElements/ErrorMessage/ErrorMessage'
import Toggle from '../../formElements/Toggle/Toggle'
import './ArticleForm.scss'

function ArticleForm() {
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
				<TextInput {...fieldAttrs.name} label='Название статьи' />
				<TextInput {...fieldAttrs.chapter} label='Номер главы' />
				<Toggle {...fieldAttrs.published} label='Опубликована' />
				<TextInput {...fieldAttrs.summary} label='Краткое описание статьи' inputType='textarea' />
				<TextInput {...fieldAttrs.content} label='Разметка статьи из редактора' inputType='textarea' />
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
}

export default ArticleForm
