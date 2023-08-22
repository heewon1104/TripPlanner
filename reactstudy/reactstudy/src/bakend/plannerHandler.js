import mysql from "mysql"


// mySql db에 연결, 각 항목별로 입력해주시면 됩니다.
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'jk8618829@',
    database : 'tripPlanner'
})


function dbQueryPromise(item){

    let temp = new Array()

    let x = new Promise(async (res , rej) => {

        db.query(`SELECT * FROM schedule WHERE planner_id = ${item}` , async (error , datas , field) => {
                
            if(error){
                reject();
            }else{
                for(let x in datas){
                    temp.push(datas[x])
                    console.log(datas[x])
                }

            }
        })
    })

}

// planner 를 get 메소드로 가져온다, 이 부분이 아직 구현하지 못한 부분입니다.
const getPlanner = async (req , res) => {

    const user = req.query
    // user를 받는다, user가 만드는 planner의 갯수는 여러가지가 가능하다. 따라서 그 user가 생성한 모든 플래너의 id를 가져와야 함.
    db.query(`SELECT * FROM planner WHERE user_id = ${user.id}` , async (err , results , field) => {
        // 해당 user_id 에 의해 만들어진 모든 planner를 가져온다.
        let arr = new Array()
        // arr에 
        if(err){
            throw err;

        }else if(results.length == 0){
            console.log("No data Existing")

        }else{
            for(let x in results){
                let t = await dbQueryPromise(results[x].planner_id)
                arr.push(t)
            }
            // dbQueryPromise 함수는 db 에서 해당 정보를 가져오는 함수이다
            // 이 함수 자체를 비동기로 만들어서 db.query 에서 async 를 사용하지 못하는 문제 해결
            
        }

        console.log(arr , 5)
    })

}

const postPlanner = (req , res) => {
    // 입력받은 planner를 db에 저장하는 코드
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