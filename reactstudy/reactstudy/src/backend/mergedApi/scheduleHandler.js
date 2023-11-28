import mysql from "mysql2/promise.js"
import { DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USER } from "./env.js"

const createConnection = async () => {
    const connection = await mysql.createConnection({
      host: 'jhdb98.cuy7pwybpmhj.ap-northeast-2.rds.amazonaws.com',
      user: 'manager2',
      password: 'manager2!',
      database: 'testusers',
    });
    return connection;
};
  
let db;
(async () => {
    db = await createConnection();
})();

 
const postSchedule = async (req , res) => { // 비동기 함수로 변경

    try {
        const [rows, fields] = await db.query(`INSERT INTO schedule (start, startday, start_time, end_time, planner_id, user_id)
        VALUES (?, ?, ?, ?, ?, ?)`, [req.body.start, req.body.startday, req.body.starttime, req.body.endtime, req.body.planner_id, req.body.user_id]);
        console.log(req.body); 
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

const updateSchedule = (req , res) => {

}

const deleteSchedule = async (req , res) => {
    // 스케줄을 삭제합니다.

    try {
        const { user_id , startday, start_time} = req.body;
        console.log( req.body);

        const [rows, fields] = await db.query(
            'DELETE FROM schedule WHERE user_id = ? AND startday = ? AND start_time = ?',
            [user_id , startday, start_time]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}


export {postSchedule, updateSchedule, deleteSchedule}

