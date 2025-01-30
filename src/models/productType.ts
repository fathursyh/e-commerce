export interface ProductType {
    id: string,
    title: string,
    image: string,
    price: number,
    desc: string,
    stock: number,
}

export type CartType = {
  "id": string,
  "quantity": number
}