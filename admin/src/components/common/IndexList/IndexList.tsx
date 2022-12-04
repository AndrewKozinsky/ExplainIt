// import React, { ReactElement } from 'react'
// import makeClasses, { DetailsType } from 'components/common/IndexList/IndexList-classes'
// import SvgIcon from 'components/icons/SvgIcon'
// import { onControlClick } from 'components/common/IndexList/IndexList-func'

// Тип пункта списка
/*export type IndexListItemType = {
	id: number,
	name: string
	payAtn?: boolean
	published?: boolean
	selected?: boolean
	order: number
}*/

/*type IndexListPropType = {
	items: IndexListItemType[] // Список пунктов
	selectedItemId: null | number // id выделенного пункта
	onClickHandler: (selectedItemId: number) => void // Обработчик щелчка по элементу
	onDeleteItem: (itemId: number) => void // Обработчик удаления элемента
	onChangeItemOrder: (itemId: number, direction: 'up' | 'down') => void // Обработчик изменения порядка элементов
}*/

/** Список названий глав или предложений */
/*function IndexList(props: IndexListPropType): ReactElement {
	const { items, selectedItemId, onClickHandler, onDeleteItem, onChangeItemOrder } = props

	return (
		<menu className='index-list'>
			{items.map(itemData => {
				return (
					<IndexItem
						item={itemData}
						selectedItemId={selectedItemId}
						onClickHandler={onClickHandler}
						onDeleteItem={onDeleteItem}
						onChangeItemOrder={onChangeItemOrder}
						key={itemData.id}
					/>
				)
			})}
		</menu>
	)
}*/

// export default IndexList


/*type IndexItemPropType = {
	item: IndexListItemType
	selectedItemId: null | number
	onClickHandler: (itemId: number) => void
	onDeleteItem: (itemId: number) => void
	onChangeItemOrder: (itemId: number, direction: 'up' | 'down') => void
}*/

/** Элемент списка */
/*function IndexItem(props: IndexItemPropType) {
	const { item, selectedItemId, onClickHandler, onDeleteItem, onChangeItemOrder } = props
	const isItemSelected = item.id === selectedItemId

	const CN = makeClasses({ item, isSelected: isItemSelected })

	return (
		<div className={CN.item} onClick={() => onClickHandler(item.id)}>
			<span className={CN.itemText}>{item.name}</span>
			<PayAtn visible={!!item.payAtn} />
			<HiddenSign published={!!item.published} isSelected={isItemSelected} />
			<div className={CN.controls}>
				<button className={CN.control} onClick={
					onControlClick(() => onChangeItemOrder(item.id, 'down'))
				}>
					<SvgIcon type='btnSignDown' />
				</button>
				<button className={CN.control} onClick={
					onControlClick(() => onChangeItemOrder(item.id, 'up'))
				}>
					<SvgIcon type='btnSignUp' />
				</button>
				<button className={CN.control} onClick={
					onControlClick(() => onDeleteItem(item.id))
				}>
					<SvgIcon type='btnSignTrash' />
				</button>
			</div>
		</div>
	)
}*/

/*type PayAtnPropType = {
	visible: boolean
}*/

/** Значок PayAtn */
/*function PayAtn(props: PayAtnPropType) {
	const { visible } = props
	const CN = makeClasses({} as DetailsType)

	if (!visible) return null

	return <span className={CN.payAtn}>PayAtn</span>
}*/


/*type HiddenSignPropType = {
	published: boolean
	isSelected: boolean
}*/

/** Значок неопубликованного материала */
/*function HiddenSign(props: HiddenSignPropType) {
	const { published, isSelected } = props

	const CN = makeClasses({ isSelected } as DetailsType)

	if (published) return null

	return <SvgIcon type='hidden' extraClass={CN.hiddenSign} />
}*/

export {}
