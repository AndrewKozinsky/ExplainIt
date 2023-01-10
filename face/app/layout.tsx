import React from 'react'
import RootProvider from '../src/components/common/RootProvider/RootProvider'
import IndexModal from '../src/components/indexModal/IndexModal/IndexModal'

type RootLayoutPropType = {
	children: React.ReactNode
}

export default function RootLayout(props: RootLayoutPropType) {
	const { children } = props

	return (
		<html lang="ru">
			<head />
			<body>
			<RootProvider>
				<div id='root'>
					{children}
					<IndexModal />
				</div>
			</RootProvider>
			</body>
		</html>
	)
}
