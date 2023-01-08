import React from 'react'
import RootProvider from '../components/common/RootProvider/RootProvider'

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
				</div>
			</RootProvider>
			</body>
		</html>
	)
}
