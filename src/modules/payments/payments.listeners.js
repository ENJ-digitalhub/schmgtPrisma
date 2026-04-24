import eventBus from "../../lib/eventBus.js";
import { PAYMENT_EVENTS } from "./payments.events.js";

eventBus.on(PAYMENT_EVENTS.RECORDED, (payload) => {
  console.log(`Payment recorded event received for student ${payload.studentId}`);
});
