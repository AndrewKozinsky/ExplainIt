
// Типы присутствующие в моделях
namespace ModelTypes {
	export namespace ProposalGroup {
		export type GroupType = 'oral' | 'writing' // Тип упражнений: oral или writing

		export enum GroupTypeEnum {
			ORAL = 'oral',
			WRITING = 'writing'
		}
	}


}

export default ModelTypes
