import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import { Container, ProductForm } from "../../../../shared/components/shared";

// Важно: params — PROMISE!
export default async function ProductPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Ждем params из промиса

  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
