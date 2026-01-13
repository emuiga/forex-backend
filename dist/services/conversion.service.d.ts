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
export declare function convertCurrency(amount: number, baseCurrency: string, targetCurrency: string): Promise<ConversionResult>;
export declare function getConversions(): Promise<ConversionRecord[]>;
//# sourceMappingURL=conversion.service.d.ts.map