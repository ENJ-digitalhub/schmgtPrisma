export async function listStudentsRepo() {
  return [];
}

export async function createStudentRepo(payload) {
  return {
    id: Date.now(),
    ...payload,
  };
}
