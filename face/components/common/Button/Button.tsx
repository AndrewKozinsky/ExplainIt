import React from 'react'
import cn from 'classnames'
import './Button.scss'

type ButtonPropType = {
	text: string
	size?: 'medium' | 'big'
	arrow?: boolean
	design?: 'bordered' | 'filled'
	onClick?: () => void
}

function Button(props: ButtonPropType) {
	const {
		text,
		size = 'medium',
		arrow = false,
		design = 'bordered',
		onClick = () => {}
	} = props

	const classes = ['button', `button--${size}-size`, `button--${design}`]


	return (
		<button className={cn(classes)} onClick={onClick}>
			{text}
			{arrow && <span className='button__arrow'>→</span>}
		</button>
	)
}

export default Button
