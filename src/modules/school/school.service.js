import eventBus from '../../lib/eventBus.js';
import { SCHOOL_EVENTS } from './school.events.js';
import { createSchool, getSchoolHealth } from './school.repository.js';

export async function getSchoolModuleStatus() {
  return getSchoolHealth();
}

export async function createSchoolRecord(payload = {}) {
  const schoolData = {
    name: payload.name || 'Demo School',
    createdAt: new Date().toISOString(),
  };

  const school = await createSchool(schoolData);

  eventBus.emit(SCHOOL_EVENTS.CREATED, school);

  return school;
}
