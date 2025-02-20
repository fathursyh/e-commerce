import { actions } from "astro:actions";
import ProductCard from "../composables/ProductCard";
import { useEffect, useState } from "react";
import type { ProductType } from "src/models/productType";

export function FeaturedProduct() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    const { data } = await actions.product.featuredProduct();
    setProducts(data as ProductType[]);
    sessionStorage.setItem("featured", JSON.stringify(data));
    setIsLoaded(true);
  };
  useEffect(() => {
    if (sessionStorage.getItem("featured") !== null) {
      setProducts(JSON.parse(sessionStorage.getItem("featured")!));
      setIsLoaded(true);
    } else {
      fetchData();
    }
  }, []);

  if(!isLoaded) {
    return (
      <div className="grid place-items-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  if(products.length < 1) {
    return (
      <p className="text-center">No featured products.</p>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8 place-items-stretch">
      {
        products.map((item) => (
          <ProductCard
            key={item.id_product}
            data={item}
          />
      ))}
    </div>
  );
}
