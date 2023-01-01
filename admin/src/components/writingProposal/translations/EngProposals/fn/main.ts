import { BaseSyntheticEvent, MouseEvent, useCallback } from 'react'
import { State } from '../../Translations/fn/useGetState'
import { SetStateType, StateType } from '../../Translations/fn/stateContext'
import { produce } from 'immer'

export function useGetOnInputChange(
	state: StateType,
	setState: SetStateType,
	blockId: number,
	proposalObj: State.EngProposal
) {
	return useCallback(function (e: BaseSyntheticEvent) {
		const { value } = e.target

		changeEngProposal(value, state, setState, blockId, proposalObj)
	}, [state])
}

/**
 * Удаляет вариант перевода русского предложения
 * @param {String} newValue — изменённое значение перевода предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} proposalObj — объект перевода русского предложения
 */
function changeEngProposal(
	newValue: string,
	state: StateType,
	setState: SetStateType,
	blockId: number,
	proposalObj: State.EngProposal
) {
	const newState = produce(state, (draft) => {
		const block = draft.blocks.find(block => block.id === blockId)
		if (!block) return

		const engProposal = block.engProposals.find(proposal => {
			return proposal.id === proposalObj.id
		})
		if (!engProposal) return

		engProposal.proposal = newValue
	})

	setState(newState)
}

/**
 * Обработчик нажатия на кнопку удаления варианта перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} proposalObj — объект перевода русского предложения
 */
export function useGetDeleteEngProposal(
	state: StateType,
	setState: SetStateType,
	blockId: number,
	proposalObj: State.EngProposal
) {
	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		const confirmed = confirm('Вы уверены в удалении перевода?')

		if (confirmed) {
			deleteEngProposal(state, setState, blockId, proposalObj)
		}
	}, [state])
}

/**
 * Удаляет вариант перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 * @param {Object} proposalObj — объект перевода русского предложения
 */
function deleteEngProposal(
	state: StateType,
	setState: SetStateType,
	blockId: number,
	proposalObj: State.EngProposal
) {
	const newState = produce(state, (draft) => {
		const block = draft.blocks.find(block => block.id === blockId)
		if (!block) return

		block.engProposals = block.engProposals.filter(proposal => {
			return proposal.id !== proposalObj.id
		})
	})

	setState(newState)
}

/**
 * Обработчик нажатия на кнопку добавления варианта перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
export function useGetAddEngProposal(
	state: StateType,
	setState: SetStateType,
	blockId: number,
) {
	return useCallback(function (e: MouseEvent<HTMLButtonElement>) {
		addEngProposal(state, setState, blockId)
	}, [state])
}

/**
 * Добавляет вариант перевода русского предложения
 * @param {Object} state — объект состояния блоков переводов русского предложения
 * @param {Function} setState — функция ставящая новый объект состояния блоков переводов русского предложения
 * @param {Number} blockId — id блока переводов и разбора русского предложения
 */
function addEngProposal(
	state: StateType,
	setState: SetStateType,
	blockId: number,
) {
	const newState = produce(state, (draft) => {
		const block = draft.blocks.find(block => block.id === blockId)
		if (!block) return

		const maxProposalId = block.engProposals.reduce((maxId, proposal) => {
			return proposal.id > maxId ? proposal.id : maxId
		}, 0)

		block.engProposals.push({
			id: maxProposalId + 1,
			proposal: ''
		})
	})

	setState(newState)
}
