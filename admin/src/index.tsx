import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './components/App/App'
import store from 'store/store'

const $root = document.getElementById('root') as HTMLElement
const root = createRoot($root)

root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
