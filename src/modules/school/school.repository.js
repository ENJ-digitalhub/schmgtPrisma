export async function getSchoolHealth() {
  return {
    repository: 'school',
    status: 'ok',
  };
}

export async function createSchool(payload) {
  return {
    id: Date.now(),
    ...payload,
  };
}
