import client from "./client";

const urlEndpoint = "/vouchers";

export const redeemVoucher = () => client.post(`/${urlEndpoint}/redeem`);
