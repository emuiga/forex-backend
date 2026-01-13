export async function getRates(baseCurrency) {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const baseUrl = process.env.EXCHANGE_RATE_BASE_URL;
    if (!apiKey || !baseUrl) {
        throw new Error("Missing required environment variables: EXCHANGE_RATE_API_KEY or EXCHANGE_RATE_BASE_URL");
    }
    const url = new URL("/live", baseUrl);
    url.searchParams.set("access_key", apiKey);
    url.searchParams.set("base", baseCurrency);
    let response;
    try {
        response = await fetch(url.toString());
    }
    catch (error) {
        throw new Error(`Failed to fetch exchange rates: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
    if (!response.ok) {
        throw new Error(`Exchange rate API returned error: ${response.status} ${response.statusText}`);
    }
    let data;
    try {
        data = await response.json();
    }
    catch (error) {
        throw new Error(`Failed to parse exchange rate response: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
    if (!data.success) {
        throw new Error(`Exchange rate API returned unsuccessful response: ${JSON.stringify(data)}`);
    }
    let rates;
    if (data.quotes && typeof data.quotes === "object") {
        const base = data.source || baseCurrency;
        rates = {};
        for (const [key, value] of Object.entries(data.quotes)) {
            if (key.startsWith(base)) {
                const currency = key.substring(base.length);
                rates[currency] = value;
            }
        }
    }
    else if (data.rates && typeof data.rates === "object") {
        rates = data.rates;
    }
    else {
        throw new Error("Exchange rate API response missing or invalid rates/quotes object");
    }
    return rates;
}
//# sourceMappingURL=exchangeRate.service.js.map