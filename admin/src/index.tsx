import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

function App() {
	return <div>Hello World</div>
}

const root = createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter basename='/admin'>
		<App />
	</BrowserRouter>
)
