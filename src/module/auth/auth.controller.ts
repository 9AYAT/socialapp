import { Router } from "express";
import authService from "./auth.service";
import * as authValidaton from "./auth.validation"
import { isValid } from "../../middleware";
const router=Router();
router.post("/register",isValid(authValidaton.registerSchema)
    ,authService.register)

    //verify
    router.post('/verify',authService.verifyAccount)
    //login
    router.post("/login",authService.login)
export default router;