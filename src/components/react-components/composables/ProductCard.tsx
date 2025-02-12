import { useToast } from "@/hooks/use-toast";
import type { ProductType } from "src/models/productType";
import { localCurency } from "src/stores/utility";
type CardProps = {
  data: ProductType;
};
export default function ProductCard({ data }: CardProps) {
  const { toast } = useToast();
  console.log(data)
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="h-[60%]">
        <img
          src={data.image}
          alt="Product Image"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h3 className="text-success">{localCurency(data.price)}</h3>
        <h2 className="card-title">{data.title}</h2>
        <p>{data.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => {
            toast({
                description: "Item has been added to cart!"
            })
          }}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
