'use client'
import React from 'react'
import cn from 'classnames'
import PagesHeader from '../../common/PagesHeader/PagesHeader'
import useGetLayoutSelectors from '../../../store/layout/layoutSelectors'
import './MainPage.scss'
import { useFixDevTools } from './fn/useFixDevTools'

function MainPage() {
	const { mainPageZoom } = useGetLayoutSelectors()
	// Хук исправляющий ошибку в Redux DevTools.
	// В новых версиях Некста нужно проверить, может это исправлено.
	useFixDevTools()

	return (
		<main className={cn('main-page', mainPageZoom == -1 && 'main-page--zoomed-back')}>
			<PagesHeader />
		</main>
	)
}

export default MainPage
