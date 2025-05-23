"use client";
import { cn } from '../../lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import {  PizzaSize, PizzaType, pizzaTypes } from '../../constans/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { usePizzaOptions } from '../../hooks';
import { getPizzaDetails } from '../../lib';





interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  className?: string;
  onSumbit: (itemId: number, ingredients: number[]) => void
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
  name,
  items,
  imageUrl,
  ingredients,
  className,
  loading,
  onSumbit,
}) => {
  const {size, type, availableSizes, selectedIngredints, setSize, currentItemId, addIngredient, setType} = usePizzaOptions(items);

  const {totalPrice, textDetaills} = getPizzaDetails(type, size, items, ingredients, selectedIngredints);
  const handleClickAdd = () => {
    if (currentItemId) {
      onSumbit(currentItemId, Array.from(selectedIngredints));
    }
  };
  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />


      

      <div className="w-[490px] bg-[#f7f6f5] p-7">
      <Title text={name} size="md" className="font-extrabold mb-1" />

      <p className="text-gray-400">{textDetaills}</p>

     <div className='flex flex-col gap-4 mt-5'>
     <GroupVariants 
      items={availableSizes}
      value={String(size)}
      onClick={value => setSize(Number(value)as PizzaSize)}
        />

<GroupVariants 
      items={pizzaTypes}
      value={String(type)}
      onClick={value => setType(Number(value)as PizzaType)}
        />
     </div>

    <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrpllbar mt-5'>
    <div className='grid grid-cols-3 gap-3'>
    {ingredients.map((ingredient) => (
      <IngredientItem 
      key={ingredient.id}
      name={ingredient.name}
      price={ingredient.price}
      imageUrl={ingredient.imageUrl}
      onClick={() => addIngredient(ingredient.id)}
      active={selectedIngredints.has(ingredient.id)}

      />
    ))}
    </div>
      </div>


      <Button
      loading={loading}
         onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
        <div/>
    </div>
    </div>
  );
};
