
// Объект с сообщениями об ошибках DTO
const dtoErrorMessages = {
	mustBeNumber: 'Должно быть число.',
	mustBeString: 'Должно быть строковым значением.',
	mustBeBool: 'Должно быть строковым значением.',

	// Про строки
	mustBeEqualOrShorter(length: number | string) {
		return `Значение должно быть короче или равно ${length} символам`
	},
	mustBeEqualOrGreater(length: number | string) {
		return `Значение должно быть больше или равно ${length} символам`
	},

	// Про числа
	shouldNotBeMore(max: number | string) {
		return `Значение не должно быть больше ${max}`
	},

	// Переданное значение должно быть одним из возможных
	oneOf(rightValues: (number | string)[]) {
		if (rightValues.length == 2) {
			return `Значение должно быть или ${rightValues[0]} или ${rightValues[1]}`
		}
		else {
			return `Допустимые значения: ${rightValues.join(', ')}`
		}
	}
}

export default dtoErrorMessages
