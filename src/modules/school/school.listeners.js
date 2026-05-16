import eventBus from "../../lib/eventBus.js";
import { SCHOOL_EVENTS } from "./school.events.js";

eventBus.on(SCHOOL_EVENTS.ADMIN_CREATED, (admin) => {
  console.log(
    `School event: admin created for ${admin.user.email} at ${admin.schoolName}`
  );
});
