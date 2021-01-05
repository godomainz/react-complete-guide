import { Ingredients } from "./ingredients";
export default interface IngredientState {
    ingredients: Ingredients;
    totalPrice:number;
    error: boolean;
    building: boolean;
}