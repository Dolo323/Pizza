import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { mapPizzaType, PizzaSize, PizzaType } from './../constans/pizza';
import { Ingredient, ProductItem } from "@prisma/client";


export const getPizzaDetails = (type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const textDetaills = `${size} см, ${mapPizzaType[type]} тесто`;
      const totalPrice = calcTotalPizzaPrice(
        type,
        size,
        items,
        ingredients,
        selectedIngredients,
      );

      return {textDetaills, totalPrice};
}