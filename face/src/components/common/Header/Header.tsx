import React from 'react'
import './Header.scss'

type HeaderPropType = {
	headerType?: 'h1' | 'h2' | 'h3' | 'h4'
	children: string
}

function Header(props: HeaderPropType) {
	const { headerType = 'h1', children }= props

	if (headerType == 'h1') {
		return <h1 className='header h1'>{children}</h1>
	}
	else if (headerType == 'h2') {
		return <h1 className='header h2'>{children}</h1>
	}
	else if (headerType == 'h3') {
		return <h1 className='header h3'>{children}</h1>
	}
	else {
		return <h1 className='header h4'>{children}</h1>
	}
}

export default Header

