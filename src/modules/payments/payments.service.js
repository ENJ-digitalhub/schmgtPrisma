import eventBus from "../../lib/eventBus.js";
import { PAYMENT_EVENTS } from "./payments.events.js";
import { listPaymentsRepo, recordPaymentRepo } from "./payments.repository.js";

export async function listPayments() {
  return listPaymentsRepo();
}

export async function recordPayment(payload) {
  const { studentId, amount } = payload;

  if (!studentId || !amount) {
    throw new Error("studentId and amount are required");
  }

  const payment = await recordPaymentRepo(payload);

  eventBus.emit(PAYMENT_EVENTS.RECORDED, payment);

  return payment;
}
