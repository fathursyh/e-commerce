import { actions } from "astro:actions";
import ProductCard from "../composables/ProductCard";
import { useEffect, useState } from "react";
import type { ProductType } from "src/models/productType";

export default function featuredProduct() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const fetchData = async() => {
    const {data} = await actions.product.featuredProduct();
    setProducts(data as ProductType[])
    sessionStorage.setItem('featured', JSON.stringify(data));
  }
  useEffect(()=>{
    if(sessionStorage.getItem('featured') !== null) {
        setProducts(JSON.parse(sessionStorage.getItem('featured')!));
    } else {
      fetchData();
    }
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 place-items-stretch">
      {
        products.length > 0?
          products.map((item)=>(
            <ProductCard key={item.id_product} data={item} />
          ))
        : 
        <p>No featured products.</p>
      }
    </div>
  );
}