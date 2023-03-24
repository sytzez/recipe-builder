import { Entity } from "../types/entity";
import { Store } from "solid-js/store";

export const find = <T>(list: Entity<T>[], id: number): Store<T> | null => (
    list.find((entity) => entity.id == id)
        ?.data
)
