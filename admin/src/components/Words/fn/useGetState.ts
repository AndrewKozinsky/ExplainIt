// import { useState } from 'react'
// import useGetArticleSelectors from 'store/article/articleSelectors'
// import Types from 'types/Types'
// import findService from 'services/find.service'

/*export type WordObjType = {
	id: number
	rusWord: string
	note: string
	engWord: string
}*/

/*export function useGetState() {
	const { article, currentGroupId, currentGroupType, currentProposalId } = useGetArticleSelectors()

	const [wordsState, setWordsState] = useState<WordObjType[]>(
		createState(article, currentGroupId, currentGroupType, currentProposalId)
	)

	return {
		wordsState,
		setWordsState
	}
}*/

/*function createState(
	article: null | Types.Req.Article.FullArticle,
	currentGroupId: null | number,
	currentGroupType: Types.Entity.Group.GroupType | null,
	currentProposalId: null | number
): WordObjType[] {
	if (!article || !currentGroupId || !currentGroupType || !currentProposalId) {
		return []
	}

	const proposal = findService.findProposalInArticle(
		article, currentGroupId, currentGroupType, currentProposalId
	) as Types.Entity.WritingProposal.Item

	return proposal.words.map((wordObj) => createWordBlockItemFromWord(wordObj))
}*/

/**
 * Функция получает объект перевода из предложения статьи
 * и возвращает объект перевода требуемый для формата местного Состояния
 * для показа неправильных переводов письменного предложения.
 * @param {String} translationText — текст перевода
 */
/*export function createWordBlockItemFromWord(
	wordObj: Types.Entity.Word.Item
): WordObjType {
	return {
		id: wordObj.id,
		rusWord: wordObj.rusWord,
		note: wordObj.note || '',
		engWord: wordObj.engWord
	}
}*/

export {}
