import { z } from "zod";

export const ConvertRequestSchema = z.object({
  amount: z
    .number({
      required_error: "amount is required",
      invalid_type_error: "amount must be a number",
    })
    .positive("amount must be greater than 0")
    .finite("amount must be a finite number"),

  baseCurrency: z
    .string({
      required_error: "baseCurrency is required",
      invalid_type_error: "baseCurrency must be a string",
    })
    .length(3, "baseCurrency must be 3 characters")
    .regex(/^[A-Z]{3}$/, "baseCurrency must be uppercase 3-letter code")
    .transform((val) => val.toUpperCase()),

  targetCurrency: z
    .string({
      required_error: "targetCurrency is required",
      invalid_type_error: "targetCurrency must be a string",
    })
    .length(3, "targetCurrency must be 3 characters")
    .regex(/^[A-Z]{3}$/, "targetCurrency must be uppercase 3-letter code")
    .transform((val) => val.toUpperCase()),
}).refine(
  (data) => data.baseCurrency !== data.targetCurrency,
  {
    message: "baseCurrency and targetCurrency must be different",
    path: ["targetCurrency"],
  }
);

export type ConvertRequest = z.infer<typeof ConvertRequestSchema>;


