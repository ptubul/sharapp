import {z} from 'zod'

const userSchema = z.object({
    password: z.string().min(3).max(10).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      }),
    email: z.string().email(),
  });


export default userSchema