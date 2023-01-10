'use client'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from '../../../store/store'

type RootProviderPropType = {
	children: ReactNode
}

function RootProvider(props: RootProviderPropType) {
	const { children } = props
	return (
		<Provider store={store}>
			{children}
		</Provider>
	)
}

export default RootProvider
