import eventBus from "../../lib/eventBus.js";
import { STUDENT_EVENTS } from "./student.events.js";

eventBus.on(STUDENT_EVENTS.CREATED, (payload) => {
  console.log(`Student created event received for ${payload.email}`);
});
