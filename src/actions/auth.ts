import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { supabase } from 'src/lib/database';

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
    }).refine((data) => data.password === data.confirmPassword, { message: 'Confirm password is not match.', path: ['confirmPassword'] }),
    handler: async (input) => {
      const { email, password } = input;
      if (!email || !password) {
        return new Response("Email and password are required", { status: 400 });
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
          stack: error.stack
        })
      } 
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
      const { email, password } = input;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
          stack: error.stack
        })

      } else {
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