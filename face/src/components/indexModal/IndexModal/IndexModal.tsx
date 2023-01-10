'use client'
import React from 'react'
import Modal from '../../common/Modal/Modal'
import useGetLayoutSelectors from '../../../store/layout/layoutSelectors'
import Header from '../../common/Header/Header'
import CloseButton from '../CloseButton/CloseButton'
import './IndexModal.scss'

// Модальное окно со списком всех статей
function IndexModal() {
	const { indexPageZoom } = useGetLayoutSelectors()

	return (
		<Modal isOpen={indexPageZoom == 0} extraClass='index-modal'>
			<div className='index-modal__header-block'>
				<Header>Оглавление</Header>
				<CloseButton/>
			</div>
		</Modal>
	)
}

export default IndexModal

