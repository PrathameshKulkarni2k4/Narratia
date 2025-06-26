import express from "express"
// import isAuthenticated from "../middlewares/authmiddleware"
import { Register,  Login ,  Logout } from "../controllers/user.js"

const router = express.Router();

router.post("/register" ,Register);
router.post("/login" , Login);
router.post("/logout" ,Logout)

export default router;

