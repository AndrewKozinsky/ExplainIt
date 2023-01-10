import React from 'react'
import { useGetCloseIndexModal } from './fn/useGetCloseIndexModal'
import timesImgData from './images/times.svg'

function CloseButton() {
	const closeIndexModal = useGetCloseIndexModal()

	return (
		<button
			className='close-button'
			onClick={closeIndexModal}
		>
			<img src={timesImgData.src} alt='close' />
		</button>
	)
}

import './CloseButton.scss'

export default CloseButton
