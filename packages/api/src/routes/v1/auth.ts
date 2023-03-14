import express from "express";
import {authController} from "../../controllers/auth";

const router = express.Router();

router.route('/login').get(authController.login);
router.route('/logout').get(authController.logout)
router.route('/auth').get(authController.code);

export const authRoute = router;
