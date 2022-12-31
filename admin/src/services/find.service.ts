import store from 'store/store'
import { articleRequests } from 'requests/articleRequests'
import articleSlice from 'store/article/articleSlice'
import globalErrorsSlice from 'store/globalErrors/globalErrorsSlice'
import Types from '../types/Types'
import { removeFromLocalStorage } from 'utils/miscUtils'
import { IndexListItemType } from '../components/common/IndexList/IndexList'
import { saveAppDataToLocalStorage } from '../components/main/App/func/restoreStateFunc'
import proposalGroupService from 'services/proposalGroup.service'

const findService = {
	// Поиск в статье всех предложений указанной группы
	findGroupProposalsInArticle(article:  Types.Req.Article.FullArticle, groupId: number) {
		const group = this.findGroupInArticle(article, groupId)
		if (!group) return

		if (group.type === 'oral') {
			return group.oralProposals
		}
		else {
			return group.writingProposals
		}
	},

	// Поиск предложения в группе
	findProposalInGroup(
		group: Types.Req.ProposalGroup.Group,
		proposalType: Types.Entity.Group.GroupType,
		proposalId: number
	) {
		if (proposalType == 'oral') {
			return group.oralProposals.find(proposal => {
				return proposal.id == proposalId
			})
		}
		else {
			return group.writingProposals.find(proposal => {
				return proposal.id == proposalId
			})
		}
	},

	// Поиск группы предложений по идентификатору
	findGroupInArticle(article:  Types.Req.Article.FullArticle, groupId: number) {
		return article.proposalsGroups.find(group => {
			return group.id == groupId
		})
	},

	// Поиск предложения в статье
	findProposalInArticle(
		article: Types.Req.Article.FullArticle,
		groupId: number,
		proposalType: Types.Entity.Group.GroupType,
		proposalId: number,
	) {
		const group = this.findGroupInArticle(article, groupId)
		if (!group) return null

		return this.findProposalInGroup(group, proposalType, proposalId)
	},
}

export default findService
