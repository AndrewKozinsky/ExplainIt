'use client'
import React, { ReactNode } from 'react'
import { useGetClasses } from './fn/useGetClasses'
import './Modal.scss'

type ModalPropType = {
	children: ReactNode
	isOpen: boolean
	extraClass?: string
}

// Модальное окно
function Modal(props: ModalPropType) {
	const { children, isOpen, extraClass = '' } = props

	const classes = useGetClasses(isOpen, extraClass)

	return (
		<div className={classes}>
			{children}
		</div>
	)
}

export default Modal
