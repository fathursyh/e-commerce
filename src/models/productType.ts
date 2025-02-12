export interface ProductType {
    id: string,
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