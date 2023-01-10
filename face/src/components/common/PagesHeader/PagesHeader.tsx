'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '../Button/Button'
import './PagesHeader.scss'
import { useGetOpenIndexModal } from './fn/openIndexModal'

// Верхний блок на всех страницах
function PagesHeader() {
	const openIndexModal = useGetOpenIndexModal()

	return (
		<nav className='page-header'>
			<div>
				<Logo />
				<p className='page-header__desc'>Курс английского языка</p>
			</div>
			<Button text='Оглавление' onClick={openIndexModal} />
		</nav>
	)
}

export default PagesHeader

function Logo() {
	return (
		<p className='page-header__logo'>
			<LogoText />
		</p>
	)
}

function LogoText() {
	const pathname = usePathname()

	return pathname == '/'
		? <>Explain it</>
		: <Link href='/face/public'>Explain it</Link>
}
