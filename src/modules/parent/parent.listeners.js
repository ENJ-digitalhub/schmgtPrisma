import eventBus from "../../lib/eventBus.js";
import { PARENT_EVENTS } from "./parent.events.js";

eventBus.on(PARENT_EVENTS.CREATED, (payload) => {
  console.log(`Parent created event received for ${payload.email}`);
});
