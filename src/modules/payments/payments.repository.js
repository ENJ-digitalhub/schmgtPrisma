export async function listPaymentsRepo() {
  return [];
}

export async function recordPaymentRepo(payload) {
  return {
    id: Date.now(),
    ...payload,
  };
}
