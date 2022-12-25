import React from 'react'
import './ErrorMessage.scss'

type ErrorMessagePropType = {
	text: string
}

// Универсальное сообщение об ошибке
function ErrorMessage(props: ErrorMessagePropType) {
	const { text }= props

	return (
		<p className='form-error'>
			{text}
		</p>
	)
}

export default ErrorMessage
