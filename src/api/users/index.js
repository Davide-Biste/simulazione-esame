import { Router } from "express";
import User from "./model.js";
import { validateJWT } from "../../services/jwt";
const router = new Router();

router.get("/", validateJWT, async (request, response) => {
  return response.json(await User.find({}, { _id: true, username: true }));
});

router.get("/:id", validateJWT, async (request, response) => {
  const element = await User.findOne({ _id: request.params.id });
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", async (request, response, next) => {
  try {
    return response.json(await User.create(request.body));
  } catch (e) {
    next(e);
  }
});

router.put("/:id", validateJWT, async (request, response) => {
  const element = await User.findOne({ _id: request.params.id });
  if (element) {
    element.set(request.body);
    await element.save();
  }
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", validateJWT, async (request, response) => {
  const result = await User.deleteOne({ _id: request.params.id });
  return result?.deletedCount > 0
    ? response.sendStatus(204)
    : response.sendStatus(404);
});

export default router;
