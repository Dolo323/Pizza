// app/(root)/@modal/(.)product/[id]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '../../../../../prisma/prisma-client';
import { ChooseProductModal } from '../../../../../shared/components/shared';

type Props = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductModalPage(props: Props) {
  // Получаем id из промиса params
  const { id } = await props.params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}

// Если вам нужна функция generateMetadata:
export async function generateMetadata(props: Props) {
  const { id } = await props.params;
  
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
  });
  
  if (!product) {
    return { title: "Продукт не найден" };
  }
  
  return {
    title: product.name,
    // другие метаданные
  };
}
