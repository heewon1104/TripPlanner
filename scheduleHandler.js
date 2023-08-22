import mysql from "mysql2/promise"
import { DB_HOST, DB_PASSWORD, DB_TABLE_NAME, DB_USER } from "./env.js"


const db = mysql.createConnection({
    host : 'localhost',
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_TABLE_NAME
})

const postSchedule = (req , res) => {
    // 플래너 내의 스케줄을 저장합니다
    db.query(`INSERT INTO schedule (place, start_time, end_time, planner_id, user_id)
    VALUES ('${req.body.place}', '${req.body.plan_start}', '${req.body.plan_end}', '${req.body.planner_id}' , '${req.body.user_id}')` , (err , results , field) => {
        
        if (err){
            throw err;
        }else{
            res.sendStatus(200)
        }
    })
}

const updateSchedule = (req , res) => {

}

const deleteSchedule = (req , res) => {
    // 스케줄을 삭제합니다. 
    const id = req.params.id
    
    db.query(`DELETE FROM schedule WHERE schedule_id = '${id}'` , (err , results , field) => {
        // 사람들이 짜는 플래너의 이름은 서로 같을 수 있다, 따라서 user_id 와 title 을 모두 비교해야함
        if(err){
            throw err
        }else{
            res.sendStatus(200)
        }
    })

}

export {postSchedule, updateSchedule, deleteSchedule}
