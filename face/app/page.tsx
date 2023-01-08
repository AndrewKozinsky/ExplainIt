import './css/reset.css'
import './css/variables.scss'
import './css/general.scss'
import '../components/mainPage/css/main-page.scss'
import PagesHeader from '../components/common/PagesHeader/PagesHeader'


export default function Home() {
	return (
		<main className='main-page'>
			<PagesHeader />
		</main>
	)
}
