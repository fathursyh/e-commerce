import { auth } from './auth';
import { cart } from './cart';
import { payment } from './payment';
import { product } from './product';
import { transactions } from './transactions';

export const server = {
  product,
  auth,
  cart,
  payment,
  transactions,
}