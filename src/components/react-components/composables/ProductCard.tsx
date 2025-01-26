import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardData {
  title: string,
  image: string,
  price: string,
  desc: string,
  stock: number,
}
interface CardProps {
  className?: string,
  data?: CardData
}

export default function ProductCard({ className, data} : CardProps) {
  return (
    <Card className={className}>
      <img src={data?.image} alt="" />
      <CardHeader className="p-4">
        <CardTitle className="text-base">
          <p>{data?.title}</p>
        </CardTitle>
        <CardDescription className="text-xl">{data?.price}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-rows-2 gap-2">
          <Button>Buy</Button>
        <p className="text-center text-gray-500 text-sm">Stock : <span className="text-blue-500 font-medium">{data?.stock}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
