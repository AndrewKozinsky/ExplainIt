
// Тип параметров запроса
export type RequestOptionsType = {
    // Request method
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    // Additional headers
    headers?: Record<string, string>
	body?: Object
}

export type RequestOptionsPreparedType = RequestOptionsType & {
	body?: string
}

/** Функция загружающая данные с сервера
 * @param {String} urlKey — строка с адресом запроса
 * @param {Object} options — параметры запроса
 */
export async function makeFetch<T>(urlKey: string, options: RequestOptionsType): Promise<T | never> {
	// Добавление заголовка языка интерфейса в параметры запроса
	const extraOptions = prepareOptions(options)

	try {
		const rowData = await fetch(urlKey, extraOptions)
		return await rowData.json()
	}
	catch (err) {
		const message = 'Couldn\'t get data.'
		throw new Error(message)
	}
}

/**
 * Функция добавляет в объект параметров запроса заголовок Editor-Language с языком
 * @param {Object} optionsObj — объект параметров запроса
 */
function prepareOptions(optionsObj: RequestOptionsType): RequestOptionsPreparedType {
	const fixedOptions: RequestOptionsPreparedType = {
		method: optionsObj.method,
		headers: {
			...optionsObj.headers,
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=utf-8',
			'Admin-Password': 'ztpmftw4PO'
		}
	}

	if (optionsObj.body) {
		fixedOptions.body = JSON.stringify(optionsObj.body)
	}

	return fixedOptions
}
