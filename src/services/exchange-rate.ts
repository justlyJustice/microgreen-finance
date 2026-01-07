import client from "./client";

export const getUSDExchangeRate = () =>
  client.get<{ success: boolean; data: { rate: string } }>(
    "/virtual-card/exchange-rate"
  );
