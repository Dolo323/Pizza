"use client";
import React from "react";
import { useCartStore } from "../../store";
import toast from "react-hot-toast";
import { ProductWithRelations } from "../../../@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  onSumbit?: VoidFunction;
  product: ProductWithRelations;
}

export const ProductForm: React.FC<Props> = ({ product, onSumbit: _onSumbit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  const onSumbit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + " добавлена в корзину");

      _onSumbit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSumbit={onSumbit}
        loading={loading}
      />
    );
  }
  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSumbit={onSumbit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
