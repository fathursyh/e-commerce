import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProductType } from "src/models/productType";
import { insertProduct } from "src/stores/app-store";
import { localCurency } from "src/stores/utility";
import SimpleToast from "./SimpleToast";

interface CardProps {
  className?: string,
  data?: ProductType
}

export default function ProductCard({ className, data} : CardProps) {
  return (
    <Card className={className}>
      <a href={`/products/detail/${data?.id}`}>  
      <img src={data?.image} alt="" />
      <CardHeader className="p-4">
        <CardTitle className="text-base">
          <p>{data?.title}</p>
        </CardTitle>
        <CardDescription className="text-xl text-secondary">{localCurency(data?.price!)}</CardDescription>
      </CardHeader>
      </a>
      <CardContent className="pb-0">
        <div className="grid grid-rows-2 gap-2">
        <SimpleToast text="Produk berhasil ditambahkan!" >
          <Button variant={'primary'} className="text-white w-full" onClick={()=>{
            insertProduct({id: '3', quantity: 1})
          }}>Buy</Button>
          </SimpleToast>
        <p className="text-center text-gray-500 text-sm">Stock : <span className="text-blue-500 font-medium">{data?.stock}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
