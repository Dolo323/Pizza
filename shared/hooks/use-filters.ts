import {  useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps;
    
}

interface ReturnProps extends Filters{
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
    
    
}

export const useFilters = (): ReturnProps => {
  
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters, 
    string
  >;
 /*Фильтер ингредиентов */
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',')));
   
  
 
/*Фильтер размеров */
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
    )
  );
/*Фильтер типа пиццы */
  const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.has('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  );
/*Фильтер стоимости */
  const [prices, setPrices] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

/*Фильтер обновление стоимости */
 const updatePrice = (name: keyof PriceProps, value: number) => {
     setPrices(prev => ({
       ...prev,
       [name]: value,
    }));
 }

 
  return React.useMemo(() => ({
    sizes, 
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrices: updatePrice,
    setPizzaTypes: tooglePizzaTypes,
    setSizes: toggleSizes,
    setSelectedIngredients: toggleIngredients,
  }),
  [sizes, pizzaTypes, selectedIngredients, prices]);
};
