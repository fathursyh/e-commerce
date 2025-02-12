import type { ProductType } from "src/models/productType";
import { localCurency } from "src/stores/utility";
type CardProps = {
  data: ProductType;
};
export default function ProductCard({ data }: CardProps) {
  return (
    <div className="card bg-base-100 w-80 shadow-xl">
        <figure className="border">
          <img
            src={data.image}
            alt="Product Image"
            className="h-52 w-full object-cover"
          />
        </figure>
      <div className="card-body">
        <h3 className="text-success">{localCurency(data.price)}</h3>
        <h2 className="card-title">{data.title}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <a href={`/products/detail/${data.id_product}`} className="btn btn-primary">Buy Now</a>
        </div>
      </div>
    </div>
  );
}
