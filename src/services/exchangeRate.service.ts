import axios from "axios";

interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: Record<string, number>;
  rates?: Record<string, number>;
}

export async function getRates(
  baseCurrency: string
): Promise<Record<string, number>> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const baseUrl = process.env.EXCHANGE_RATE_BASE_URL;

  if (!apiKey || !baseUrl) {
    throw new Error(
      "Missing required environment variables: EXCHANGE_RATE_API_KEY or EXCHANGE_RATE_BASE_URL"
    );
  }

  const url = new URL("/live", baseUrl);
  url.searchParams.set("access_key", apiKey);
  url.searchParams.set("base", baseCurrency);

  let data: ExchangeRateResponse;
  try {
    const response = await axios.get<ExchangeRateResponse>(url.toString());
    data = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Exchange rate API returned error: ${error.response.status} ${error.response.statusText || error.message}`
        );
      }
      if (error.request) {
        throw new Error(
          `Exchange rate API request failed: ${error.message}`
        );
      }
    }
    throw new Error(
      `Failed to fetch exchange rates: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }

  if (!data.success) {
    throw new Error(
      `Exchange rate API returned unsuccessful response: ${JSON.stringify(data)}`
    );
  }

  let rates: Record<string, number>;
  if (data.quotes && typeof data.quotes === "object") {
    const base = data.source || baseCurrency;
    rates = {};
    for (const [key, value] of Object.entries(data.quotes)) {
      if (key.startsWith(base)) {
        const currency = key.substring(base.length);
        rates[currency] = value;
      }
    }
  } else if (data.rates && typeof data.rates === "object") {
    rates = data.rates;
  } else {
    throw new Error("Exchange rate API response missing or invalid rates/quotes object");
  }

  return rates;
}

