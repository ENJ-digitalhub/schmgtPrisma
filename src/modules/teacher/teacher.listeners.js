import eventBus from "../../lib/eventBus.js";
import { TEACHER_EVENTS } from "./teacher.events.js";

eventBus.on(TEACHER_EVENTS.CREATED, (payload) => {
  console.log(`Teacher created event received for ${payload.email}`);
});
