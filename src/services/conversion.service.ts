import { Decimal } from "@prisma/client-runtime-utils";
import prisma from "../db/prisma.js";
import { getRates } from "./exchangeRate.service.js";

export interface ConversionResult {
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
  convertedAmount: number;
}

export interface ConversionRecord {
  id: string;
  amount: number;
  baseCurrency: string;
  targetCurrency: string;
  conversionRate: number;
  convertedAmount: number;
  createdAt: Date;
}

export async function convertCurrency(
  amount: number,
  baseCurrency: string,
  targetCurrency: string
): Promise<ConversionResult> {
  const rates = await getRates(baseCurrency);

  if (!rates[targetCurrency]) {
    throw new Error(`Target currency ${targetCurrency} not found in exchange rates`);
  }

  const conversionRate = rates[targetCurrency];
  const convertedAmount = amount * conversionRate;

  const conversion = await prisma.conversion.create({
    data: {
      amount: new Decimal(amount),
      baseCurrency,
      targetCurrency,
      conversionRate: new Decimal(conversionRate),
      convertedAmount: new Decimal(convertedAmount),
    },
  });

  return {
    amount: conversion.amount.toNumber(),
    baseCurrency: conversion.baseCurrency,
    targetCurrency: conversion.targetCurrency,
    conversionRate: conversion.conversionRate.toNumber(),
    convertedAmount: conversion.convertedAmount.toNumber(),
  };
}

export async function getConversions(): Promise<ConversionRecord[]> {
  const conversions = await prisma.conversion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return conversions.map((conversion) => ({
    id: conversion.id,
    amount: conversion.amount.toNumber(),
    baseCurrency: conversion.baseCurrency,
    targetCurrency: conversion.targetCurrency,
    conversionRate: conversion.conversionRate.toNumber(),
    convertedAmount: conversion.convertedAmount.toNumber(),
    createdAt: conversion.createdAt,
  }));
}

