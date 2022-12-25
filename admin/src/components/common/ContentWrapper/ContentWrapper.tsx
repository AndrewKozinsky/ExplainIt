import React, { ReactElement } from 'react'
import './ContentWrapper.scss'

type ContentWrapperPropType = {
	children: ReactElement | ReactElement[]
}

// Обертка для контента больших частей страницы редактирования статей.
function ContentWrapper(props: ContentWrapperPropType) {
	const { children } = props

	return (
		<div className='content-wrapper'>
			{children}
		</div>
	)
}

export default ContentWrapper
