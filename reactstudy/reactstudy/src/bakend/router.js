import express from "express"
import { getPlanner , postPlanner , deletePlanner , updatePlanner} from "./plannerHandler.js"
import { deleteSchedule, postSchedule, updateSchedule } from "./scheduleHandler.js"

const router = express.Router()

router.get('/api/planner' , getPlanner)
router.post('/api/planner' , postPlanner)
router.delete('/api/planner/:id' , deletePlanner)
router.put('/api/planner/:id' , updatePlanner)

//schedule 에서 get은 필요 없을듯
router.post('/api/schedule' , postSchedule)
router.delete('/api/schedule/:id' , deleteSchedule)
router.put('api/schedule/:id' , updateSchedule)

export default router 