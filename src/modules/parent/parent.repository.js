export async function listParentsRepo() {
  return [];
}

export async function createParentRepo(payload) {
  return {
    id: Date.now(),
    ...payload,
  };
}
