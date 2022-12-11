import React, { ReactElement } from 'react'
import GlobalErrors from '../../GlobalErrors/GlobalErrors'
import SideBlock from '../../common/Blocks/SideBlock/SideBlock'
import Articles from '../../articles/Articles/Articles'
import { useIsEnterAllow } from './App-func'
import CreateArticleBtn from '../../articles/CreateArticleBtn/CreateArticleBtn'
import './css/reset.css'
import './css/variables.scss'
import './css/general.scss'
import './css/app.scss'


function App(): ReactElement {
	// Разрешён ли просмотр административной части
	const isEnterAllow = useIsEnterAllow()

	if (!isEnterAllow) {
		return <p>Доступ запрещён</p>
	}

	return (
		<main className='app'>
			<SideBlock leftTop={<Articles />} leftBottom={<CreateArticleBtn />} />
			<SideBlock />
			<GlobalErrors />
		</main>
	)
}

export default App
