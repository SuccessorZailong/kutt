import { Router } from "express";
import asyncHandler from "express-async-handler";
import cors from "cors";

import * as validators from "../handlers/validators";
import * as helpers from "../handlers/helpers";
import * as link from "../handlers/links";
import * as auth from "../handlers/auth";
import env from "../env";

const router = Router();

router.get(
  "/",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  helpers.query,
  asyncHandler(link.get)
);

router.post(
  "/",
  cors(),
  asyncHandler(auth.apikey),
  asyncHandler(env.DISALLOW_ANONYMOUS_LINKS ? auth.jwt : auth.jwtLoose),
  asyncHandler(auth.recaptcha),
  asyncHandler(auth.cooldown),
  validators.createLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.create)
);

/**
 * 1. 定义 path
 * 2. 定义请求方法
 */
router.patch(
  "/batchEdit",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  validators.batchEditLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.batchEdit)
);

router.patch(
  "/:id",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  validators.editLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.edit)
);


router.delete(
  "/:id",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  validators.deleteLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.remove)
);

router.get(
  "/:id/stats",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  validators.getStats,
  asyncHandler(link.stats)
);

router.post(
  "/:id/protected",
  validators.redirectProtected,
  asyncHandler(helpers.verify),
  asyncHandler(link.redirectProtected)
);

router.post(
  "/report",
  validators.reportLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.report)
);

router.post(
  "/admin/ban/:id",
  asyncHandler(auth.apikey),
  asyncHandler(auth.jwt),
  asyncHandler(auth.admin),
  validators.banLink,
  asyncHandler(helpers.verify),
  asyncHandler(link.ban)
);

export default router;
