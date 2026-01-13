import { Decimal } from "@prisma/client-runtime-utils";
import prisma from "../db/prisma.js";
import { getRates } from "./exchangeRate.service.js";
export async function convertCurrency(amount, baseCurrency, targetCurrency) {
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
export async function getConversions() {
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
//# sourceMappingURL=conversion.service.js.map