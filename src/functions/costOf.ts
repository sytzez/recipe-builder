import { Cost } from '../types/cost';

/**
 * Calculates the cost of a quantity of items of a certain cost
 */
export const costOf = (quantity: number, cost: Cost): Cost => (
    quantity * cost
)
