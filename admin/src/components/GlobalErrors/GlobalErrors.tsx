import React, { ReactElement } from 'react'
import useGetGlobalErrorsSelectors from 'store/globalErrors/globalErrorsSelectors'
import GlobalErrorsStoreType from 'store/globalErrors/GlobalErrorsStoreType'
import Button from '../formElements/Button/Button'
import { useGetOnCloseError } from './GlobalErrors-func'
import './GlobalErrors.scss'


/** Блок с сообщениями об ошибках */
function GlobalErrors(): null | ReactElement {
	const { errors } = useGetGlobalErrorsSelectors()

	if (errors.length === 0) {
		return null
	}

	return (
		<section className='global-errors'>
			{errors.map(error => {
				return <GlobalError key={error.id} error={error} />
			})}
		</section>
	)
}

export default GlobalErrors

type GlobalErrorPropType = {
	error: GlobalErrorsStoreType.GlobalError
}

function GlobalError(props: GlobalErrorPropType): ReactElement {
	const { error } = props
	const closeHandler = useGetOnCloseError(error.id)

	return (
		<div className='global-error'>
			<p className='global-error__text'>{error.text}</p>
			<Button
				view='onlyIcon'
				onClick={closeHandler}
				icon='btnSignTrash'
			/>
		</div>
	)
}

