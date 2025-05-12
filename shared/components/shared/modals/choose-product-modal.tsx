"use client";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "../../../../@types/prisma";
import { Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";
import { cn } from "../../../lib/utils";
import React from "react";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();
  
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className,
          <p>Содержимое диалога...</p>
        )}
      >
       <ProductForm product={product} onSumbit={() => router.back()}/>
      </DialogContent>
    </Dialog>
  );
};
