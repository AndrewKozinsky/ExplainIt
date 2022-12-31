import React, { ReactElement } from 'react'
import GlobalErrors from '../../GlobalErrors/GlobalErrors'
import SideBlock from '../../common/Blocks/SideBlock/SideBlock'
import Articles from '../../articles/Articles/Articles'
import { useIsEnterAllow, useRestoreAppState } from './func/App-func'
import CreateArticleBtn from '../../articles/CreateArticleBtn/CreateArticleBtn'
import Proposals from '../../proposals/Proposals/Proposals'
import CreateProposalBtn from '../../proposals/CreateProposalBtn/CreateProposalBtn'
import ProposalSwitch from '../../proposals/ProposalSwitch/ProposalSwitch'
import Article from '../../article/Article/Article'
import './css/reset.css'
import './css/variables.scss'
import './css/general.scss'
import './css/app.scss'


function App(): ReactElement {
	// Разрешён ли просмотр административной части
	const isEnterAllow = useIsEnterAllow()

	// При загрузке страницы восстановить значения Хранилища
	useRestoreAppState()

	if (!isEnterAllow) {
		return <p>Доступ запрещён</p>
	}

	return (
		<main className='app'>
			<SideBlock leftTop={<Articles />} leftBottom={<CreateArticleBtn />} right={<Article />} />
			<SideBlock leftTop={<Proposals />} leftBottom={<CreateProposalBtn />} right={<ProposalSwitch />} />
			<GlobalErrors />
		</main>
	)
}

export default App
