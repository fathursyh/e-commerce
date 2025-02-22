export interface ProductType {
    id_product: string,
    title: string,
    image: string,
    price: number,
    description: string,
    stock: number,
}

export type CartType = {
  "id": string
  "id_user": string,
  "id_product": string,
  "quantity": number
  "created_at": Date
}

export interface CartList {
  id: string,
  quantity: number,
  id_product: string,
  products: {
    price: number,
    title: string,
    image: string,
  }
}