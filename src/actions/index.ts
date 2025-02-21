import { auth } from './auth';
import { cart } from './cart';
import { payment } from './payment';
import { product } from './product';

export const server = {
  product,
  auth,
  cart,
  payment,
}