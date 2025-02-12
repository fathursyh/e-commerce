export interface ProductType {
    id_product: string,
    title: string,
    image: string,
    price: number,
    description: string,
    stock: number,
}

export type CartType = {
  "id": string,
  "quantity": number
}