// @ts-check
import express from "express";
import { deleteSuperAdminByIdController } from "../controllers/super-admin/deleteSuperAdminByIdController.js";
import { createSuperAdminController } from "../controllers/super-admin/createSuperAdminController.js";
import { getSuperAdminsController } from "../controllers/super-admin/getSuperAdminsController.js";
import { getSuperAdminByIdController } from "../controllers/super-admin/getSuperAdminByIdController.js";
import { updateSuperAdminController } from "../controllers/super-admin/updateSuperAdminController.js";
import { superAdminLoginController } from "../controllers/super-admin/superAdminLoginController.js";
import { superAdminLogoutController } from "../controllers/super-admin/superAdminLogoutController.js";
import { forgotPasswordSuperAdminController } from "../controllers/super-admin/forgotPasswordSuperAdminController.js";
import { resetPasswordSuperAdmin } from "../controllers/super-admin/resetPasswordSuperAdmin.js";
import authenticateToken from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.post("/login", superAdminLoginController);

userRoutes.post('/logout', superAdminLogoutController);

userRoutes.post("/", createSuperAdminController);

userRoutes.get("/", authenticateToken, getSuperAdminsController);

userRoutes.get("/:id", authenticateToken, getSuperAdminByIdController);

userRoutes.delete("/:id", authenticateToken, deleteSuperAdminByIdController);

userRoutes.put("/:id", authenticateToken, updateSuperAdminController);

userRoutes.post("/forgot-password", forgotPasswordSuperAdminController);

userRoutes.post("/reset-password", resetPasswordSuperAdmin);

export default userRoutes;

