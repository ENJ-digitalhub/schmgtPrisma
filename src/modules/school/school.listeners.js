import eventBus from '../../lib/eventBus.js';
import { SCHOOL_EVENTS } from './school.events.js';

eventBus.on(SCHOOL_EVENTS.CREATED, (school) => {
  console.log(`School created event received for ${school.name}`);
});
