import midtransClient from 'midtrans-client';
export const snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: import.meta.env.MIDTRANS_SERVER,
  });