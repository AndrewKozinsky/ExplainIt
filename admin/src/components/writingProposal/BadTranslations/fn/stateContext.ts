import React, { Dispatch, SetStateAction } from 'react'
import { BadTranslationType } from './useGetState'

export type StateType = BadTranslationType[]
export type SetStateType = Dispatch<SetStateAction<BadTranslationType[]>>

export const StateContext = React.createContext
	<{state: StateType, setState: SetStateType}>
	({ state: [], setState: () => {} })
