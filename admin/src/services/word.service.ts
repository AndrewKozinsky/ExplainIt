import store from 'store/store'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import wordRequests from 'requests/wordRequests'

const wordService = {
	// Создание DTO для создания слова
	/*createAddWordDto(
		proposalId: number, groupType: Types.Entity.Group.GroupType
	): Types.Req.Word.CreateOneDto {
		const dto:Types.Req.Word.CreateOneDto = {
			rusWord: '',
			engWord: '',
			order: 0,
		}

		if (groupType === 'oral') {
			dto.oralProposalId = proposalId
		}
		else if (groupType === 'writing') {
			dto.writingProposalId = proposalId
		}

		return dto
	},*/

	// Создание слова
	/*async createWord(proposalId: number, groupType: Types.Entity.Group.GroupType) {
		const reqBody = this.createAddWordDto(proposalId, groupType)

		try {
			const response = await wordRequests.createOne(reqBody)

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(globalErrorsSlice.actions.setError(
				'Возникла неизвестная ошибка при создании статьи.'
			))
		}
	},*/

	/**
	 * Удаление перевода
	 * @param {Number} translationId — id перевода
	 */
	/*async deleteWord(wordBlockId: number) {
		try {
			// Сделать запрос на удаление слова
			const response = await wordRequests.deleteOne(wordBlockId)

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при удалении слова.')
			)
		}
	},*/

	/**
	 * Функция обновляет свойства у статьи на сервере
	 * @param {Number} wordId — id слова, которое нужно обновить
	 * @param {Object} wordBlockDTO — объект с данными, которые нужно поставить в перевод
	 */
	/*async requestUpdateWord(wordId: number, wordBlockDTO: Types.Req.Word.UpdateOneDto) {
		try {
			// Сделать запрос на обновление слова
			const response = await wordRequests.updateOne(wordId, wordBlockDTO)

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError(
					'Возникла неизвестная ошибка при обновлении главы.'
				)
			)
		}
	},*/
}

export default wordService
