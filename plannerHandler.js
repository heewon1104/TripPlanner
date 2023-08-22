
import mysql from "mysql2/promise"
import { DB_HOST, DB_PASSWORD, DB_TABLE_NAME, DB_USER } from "./env.js"

// mySql db에 연결, 각 항목별로 입력해주시면 됩니다.

console.log(DB_HOST , DB_USER , DB_PASSWORD)

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'jk8618829@',
    database : 'tripPlanner'
})

const getPlanner = async (req , res) => {
    let data = (await db).query(`SELECT * FROM schedule WHERE user_id = ${req.body.user_id}`).then((result) => { res.json(result[0])})
}

const postPlanner = (req , res) => {
    // 입력받은 planner를 dxb에 저장하는 코드
    db.query(`INSERT INTO planner (user_id, planner_name, start_time, end_time)
    VALUES (${req.body.id}, '${req.body.title}', '${req.body.period_start}', '${req.body.period_end}')` , (err , results , field) => {
        // 에러가 생기면 err 를 throw
        if (err){
            throw err;
        }else{
            // 잘 실행되면 status 200 을 send
            res.sendStatus(200)
        }
    })
}

const deletePlanner = (req , res) => {
    // 플래너를 지운다
    const id = req.params.id
    // 해당 플래너의 id를 받으면, 그 planner를 db에서 찾고 삭제
    db.query(`DELETE FROM planner WHERE planner_id = '${id}'` , (err , results , field) => {
        if(err){
            throw err
        }else{
            res.sendStatus(200)
        }
    })
}

const updatePlanner = (req , res) => {

    const id = req.params.id
    // 해당 planner id 를 받으면, 그 planner 의 id 를 찾아서 해당 planner를 update
    db.query(`UPDATE planner SET .... WHERE....` , (err , results , field) => {

        if(err){
            throw err
        }else{
            res.sendStatus(200)
        }
    })

    //db.query(`UPDATE `)
}


export {getPlanner , postPlanner , deletePlanner, updatePlanner}