import React from 'react'
import './Header.scss'

type HeaderPropType = {
	text: string
}

function Header(props: HeaderPropType) {
	const { text } = props

	return (
		<h2 className='header'>
			{text}
		</h2>
	)
}

export default Header
