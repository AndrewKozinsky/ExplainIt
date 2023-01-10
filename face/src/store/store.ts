import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import layoutSlice from './layout/layoutSlice'

// Корневой редьюсер
const rootReducer = combineReducers({
	layout: layoutSlice.reducer,
})

const store = configureStore({
	reducer: rootReducer,
	devTools: true
})

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export default store
