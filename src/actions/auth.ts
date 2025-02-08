import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
// eslint-disable-next-line no-useless-escape
const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Z][\w\W]{7,}$/;
export const auth = {
  createUser: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email('Enter valid email address.').min(5),
      password: z.string().min(8, 'Password must be at least 8 characters.').regex(RegExp(regex), 'Your password must start with capital, contains numbers, and symbols.'),
      confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters.')
    }).refine((data) => data.password === data.confirmPassword, {message: 'Confirm password is not match.', path: ['confirmPassword']}),
    handler: async (input) => {
      return input;
      // await fetch(`${import.meta.env.PUBLIC_URL}/api/auth/register`, {
      //   method: 'POST',
      //   body: JSON.stringify(input),
      //   mode: 'same-origin',
      // })
      // .catch(err => {return err});
    }
  })
}