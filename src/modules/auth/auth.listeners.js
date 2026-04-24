import eventBus from "../../lib/eventBus.js";
import { AUTH_EVENTS } from "./auth.events.js";

eventBus.on(AUTH_EVENTS.USER_REGISTERED, (payload) => {
  console.log(`Auth event: registered user ${payload.email}`);
});

eventBus.on(AUTH_EVENTS.USER_LOGGED_IN, (payload) => {
  console.log(`Auth event: login for user ${payload.email}`);
});

eventBus.on(AUTH_EVENTS.USER_LOGGED_OUT, (payload) => {
  console.log(`Auth event: logout for user ${payload.userId}`);
});
