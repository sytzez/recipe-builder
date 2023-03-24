import { Entity } from "../types/entity";
import { createStore } from "solid-js/store";

export const create = <T extends object>(initialData: T): Entity<T> => {
    const [data, setData] = createStore(initialData)

    return {
        id: generateId(),
        data,
        setData,
    }
}

let lastId = 0
const generateId = () => ++lastId
