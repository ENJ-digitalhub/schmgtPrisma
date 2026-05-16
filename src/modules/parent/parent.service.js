import eventBus from "../../lib/eventBus.js";
import { PARENT_EVENTS } from "./parent.events.js";
import { createParentRepo, listParentsRepo } from "./parent.repository.js";

export async function listParents() {
  return listParentsRepo();
}

export async function createParent(payload) {
  const { email, name } = payload;

  if (!email || !name) {
    throw new Error("email and name are required");
  }

  const parent = await createParentRepo({
    email,
    name,
    role: "PARENT",
  });

  eventBus.emit(PARENT_EVENTS.CREATED, parent);

  return parent;
}
