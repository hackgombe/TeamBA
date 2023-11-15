import { Router } from "express";
import * as UserController from "@controllers/userController";
import * as authMiddleware from "@middlewares/authMiddleware";
const router: Router = Router();
router.use(authMiddleware.isAuthenticated);
router
  .route("/profile")
  .get(UserController.getProfileInfo)
  .patch(UserController.updateProfileInfo);
router.get("/profile/info", UserController.getProfileRelationalInfo);
router.route("/profile/complete").patch(UserController.completeProfile);

export default router;
