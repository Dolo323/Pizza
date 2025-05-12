import qs from "qs";
import React from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
   if ( isMounted.current ) {
     const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });

    console.log(filters, 999)
   }
    isMounted.current = true;
  }, [
    filters.pizzaTypes,
    filters.prices,
    filters.selectedIngredients,
    filters.sizes,
  ]);
};
