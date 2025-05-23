import { Suspense } from "react";
import { Container, Filters, Title, TopBar } from "../../shared/components/shared";
import { ProductsGroupList } from "../../shared/components/shared/products-group-list";
import { findPizzas, GetSearchParams } from "../../shared/lib/find-pizzas";

// Важно: теперь searchParams — Promise!
export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  // Ждём searchParams из промиса
  const resolvedSearchParams = await searchParams;
  const categories = await findPizzas(resolvedSearchParams);

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
