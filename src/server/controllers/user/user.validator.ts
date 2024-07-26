import z from "zod";

export const isUser = z.object({
  name: z.string().min(3).max(255),
  emailAddress: z.string().email(),
  gender: z.string(),
  sleepTimeDuration: z.number().min(1).max(12),
});

export const isEmail = z.object({
  emailAddress: z.string().email().optional(),
});
