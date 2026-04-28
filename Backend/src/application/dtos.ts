import { z } from 'zod';

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterDTO = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const CreateReportDTO = z.object({
  latitude: z.number(),
  longitude: z.number(),
  waterDepthCm: z.number().optional(),
  imageUrl: z.string().optional(),
});

export type LoginInput = z.infer<typeof LoginDTO>;
export type RegisterInput = z.infer<typeof RegisterDTO>;
export type CreateReportInput = z.infer<typeof CreateReportDTO>;
