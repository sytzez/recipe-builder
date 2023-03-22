import { UnitType } from './unit-type'
import { Cost } from './cost'

export interface Ingredient {
    name: string
    unitType: UnitType
    cost: Cost
}
