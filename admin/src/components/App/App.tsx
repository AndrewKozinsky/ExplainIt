import React, { ReactElement } from 'react'
import GlobalErrors from '../GlobalErrors/GlobalErrors'
import SideBlock from '../common/Blocks/SideBlock/SideBlock'
import Chapters from '../ArticleSide/Chapters/Chapters'
import { useIsEnterAllow } from './App-func'
import CreateChapterBtn from '../ArticleSide/CreateChapterBtn/CreateChapterBtn'
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
			<SideBlock leftTop={<Chapters />} leftBottom={<CreateChapterBtn />} />
			<SideBlock />
			<GlobalErrors />
		</main>
	)
}

export default App
