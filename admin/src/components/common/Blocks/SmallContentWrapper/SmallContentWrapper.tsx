import React, { ReactElement } from 'react'
import cn from 'classnames'
import './SmallContentWrapper.scss'

type SmallContentWrapper = {
	children: ReactElement | ReactElement[]
	extraClass?: string
}

function SmallContentWrapper(props: SmallContentWrapper) {
	const { children, extraClass } = props

	return (
		<div className={cn('small-content-wrapper', extraClass)}>
			{children}
		</div>
	)
}

export default SmallContentWrapper
