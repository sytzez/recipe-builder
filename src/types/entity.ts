import { SetStoreFunction, Store } from "solid-js/store";

export interface Entity<T> {
    id: number
    data: Store<T>,
    setData: SetStoreFunction<T>,
}
