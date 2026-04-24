export async function listTeachersRepo() {
  return [];
}

export async function createTeacherRepo(payload) {
  return {
    id: Date.now(),
    ...payload,
  };
}
