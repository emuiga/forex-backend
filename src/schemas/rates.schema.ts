import { z } from "zod";

export const RatesQuerySchema = z.object({
  base: z
    .string()
    .length(3, "base must be 3 characters")
    .regex(/^[A-Z]{3}$/i, "base must be a 3-letter code")
    .transform((val) => val.toUpperCase())
    .optional()
    .default("USD"),
});

export type RatesQuery = z.infer<typeof RatesQuerySchema>;

