import Types from 'types/Types'
import proposalGroupService from 'services/proposalGroup'

export function getOnSelectGroup(group: Types.Req.ProposalGroup.Group) {
	return () => proposalGroupService.select(group.id, group.type)
}
