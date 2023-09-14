import React, {createContext, useContext} from "react";
import {defaultContext, EntryContextType, EntryWithId, GenericEntryProvider} from "../../../hooks/entry";

export type ItemType = EntryWithId & {
  description: string
  group: string
  units: number
  unitPrice: number
  area: number
  areaPrice: number
  comment: string
}

export const defaultItem = (): ItemType => ({
  description: '',
  group: '',
  units: 0,
  unitPrice: 0,
  area: 0,
  areaPrice: 0,
  comment: ''
});

export const cleanItemCopy = (item: ItemType) => ({
  description: item.description,
  group: item.group,
  units: item.units,
  unitPrice: item.unitPrice,
  area: item.area,
  areaPrice: item.areaPrice,
  comment: item.comment
})

export const ItemContext = createContext<EntryContextType<ItemType>>(defaultContext);
export const useItems = () => useContext(ItemContext);

const ItemProvider = GenericEntryProvider<ItemType>('items',
  cleanItemCopy,
  defaultItem,
  (context: EntryContextType<ItemType>, children: React.ReactNode) => (
    <ItemContext.Provider value={context}>
      {children}
    </ItemContext.Provider>
  ), undefined);

export default ItemProvider;
