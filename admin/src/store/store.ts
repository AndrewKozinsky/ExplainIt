import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import articleSlice from './article/articleSlice'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'

// Корневой редьюсер
const rootReducer = combineReducers({
	article: articleSlice.reducer,
	globalErrors: globalErrorsSlice.reducer
})

const store = configureStore({
	reducer: rootReducer,
	devTools: true,
})

export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector

export default store
