import express from "express";
import { getPlanner, postPlanner, deletePlanner, updatePlanner } from "./plannerHandler.js";
import { deleteSchedule, postSchedule, updateSchedule } from "./scheduleHandler.js";
import { getExpense, postExpense, deleteExpense, updateExpense } from "./expenseHandler.js";
import { getSupplies, postSupplies, deleteSupplies, updateSupplies } from "./SuppliesHandler.js";
import { Signup } from "./signupHandler.js";
import { getUserInfo } from "./getUserInfoHandler.js";

import { DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USER } from "./env.js"

const router = express.Router();

router.get('/api/planner' , getPlanner)
router.post('/api/planner' , postPlanner)
router.delete('/api/planner/:id' , deletePlanner)
router.put('/api/planner/:id' , updatePlanner)

//schedule 에서 get은 필요 없을듯
router.post('/api/schedule' , postSchedule)
router.delete('/api/schedule' , deleteSchedule)
router.put('/api/schedule/:id' , updateSchedule)

router.get('/api/expense', getExpense)
router.post('/api/expense', postExpense)
router.delete('/api/expense', deleteExpense)
router.post('/api/updateexpense', updateExpense)

router.get('/api/supplies', getSupplies)
router.post('/api/supplies', postSupplies)
router.delete('/api/supplies', deleteSupplies)
router.post('/api/updatesupplies', updateSupplies)

router.post('/api/signup_page', Signup);

router.post('/api/user_info', getUserInfo);

export default router 