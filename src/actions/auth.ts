import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
// eslint-disable-next-line no-useless-escape
const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])[A-Z][\w\W]{7,}$/;
export const auth = {
  // REGISTER ACTION
  // TODO: make toast or alert of registering
  createUser: defineAction({
    input: z.object({
      name: z.string().min(1, 'Name is required.'),
      email: z.string().min(5, 'Email is required.').email('Enter valid email address.'),
      password: z.string().min(8, 'Password must be at least 8 characters.').regex(RegExp(regex), 'Your password must start with capital, contains numbers, and symbols.'),
      confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters.')
    }).refine((data) => data.password === data.confirmPassword, {message: 'Confirm password is not match.', path: ['confirmPassword']}),
    handler: async (input) => {
      await fetch(`${import.meta.env.PUBLIC_URL}/api/auth/register`, {
        method: 'POST',
        body: JSON.stringify(input),
        mode: 'same-origin',
      })
      .catch(err => {return err});
    }
  }),
  // LOGIN ACTION
  // TODO: make toast or alert of logged in
  loginUser: defineAction({
    input: z.object({
      email: z.string().min(5, 'Email is Required.').email(),
      password: z.string().min(1, 'Password is required.')
    }),
    handler: async (input, context) => {
      const res = await fetch(`${import.meta.env.PUBLIC_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(input),
        mode: 'same-origin',
      })
      if(res.status !== 200) {
        throw new ActionError({
          code: 'BAD_REQUEST',
        })
      } else {
        const data = await res.json();
        const { access_token, refresh_token } = data.session;
        context.cookies.set("sb-access-token", access_token, {
          path: import.meta.env.BASE_URL,
          sameSite: 'strict'
        });
        context.cookies.set("sb-refresh-token", refresh_token, {
          path: import.meta.env.BASE_URL,
          sameSite: 'strict'
        });
      }
      
    }
  })
}