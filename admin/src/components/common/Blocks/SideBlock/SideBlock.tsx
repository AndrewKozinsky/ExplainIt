import React, { ReactElement } from 'react'
import './SideBlock.scss'

type SideBlockPropType = {
	leftTop?: ReactElement | null
	leftBottom?: ReactElement | null
	right?: ReactElement | null
}

/** Блок со списком статей/предложений и блок с контентом */
function SideBlock(props: SideBlockPropType): ReactElement {
	const {
		leftTop = null,
		leftBottom = null,
		right = null
	} = props

	return (
		<div className='side-block'>
			<aside className='side-block__left'>
				<div className='side-block__left-top'>
					{leftTop}
				</div>
				<div className='side-block__left-bottom'>
					{leftBottom}
				</div>
			</aside>
			<div className='side-block__right'>
				{right}
			</div>
		</div>
	)
}

export default SideBlock
