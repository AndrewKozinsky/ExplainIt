import store from 'store/store'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import translationRequests from 'requests/translationRequests'

const translationService = {
	// Создание перевода
	/*createAddTranslationDto(proposalId: number): Types.Req.Translation.CreateOneDto {
		return {
			analysis: '',
			translations: [''],
			proposalId
		}
	},*/

	// Создание перевода
	/*async createTranslation(proposalId: number) {
		const reqBody = this.createAddTranslationDto(proposalId)

		try {
			const response = await translationRequests.createOne(reqBody)

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
	/*async deleteTranslation(translationId: number) {
		try {
			// Сделать запрос на удаление статьи
			const response = await translationRequests.deleteOne(translationId)

			if (response.status !== 'success') {
				store.dispatch(globalErrorsSlice.actions.setError(response.message))
			}
		}
		catch(err) {
			store.dispatch(
				globalErrorsSlice.actions.setError('Возникла неизвестная ошибка при удалении главы.')
			)
		}
	},*/

	/**
	 * Функция обновляет свойства у статьи на сервере
	 * @param {Number} translationId — id перевода
	 * @param {Object} body — объект с данными, которые нужно поставить в перевод
	 */
	/*async requestUpdateTranslation(translationId: number, body: Types.Req.Translation.UpdateOneDto) {
		try {
			// Сделать запрос на обновление статьи
			const response = await translationRequests.updateOne(translationId, body)

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

export default translationService
