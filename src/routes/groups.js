import {Router} from "express";
import Group from "../models/Groups.js";
import { body } from "express-validator";
import { validateErrorsMiddleware } from "../middleware/validateErrors.js"


const router=Router();

router.get("/", async (req, res) => {
    try {
        const groups = await Group.getAllGroups();
        res.send({
            groups,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

router.post("/", 
body("name").exists(),
body("name").isString(),
validateErrorsMiddleware,
async (req, res) => {
    try {
        const {name} = req.body;
        
        const group = await Group.create({name});

        res.send({
            group,
        });
    } catch (e) {
        res.status(500).send({
            error: e.message,
        });
    }
});

export default router;