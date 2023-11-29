
import mysql from "mysql2/promise.js"
import { DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USER } from "./env.js"

// mySql db에 연결, 각 항목별로 입력해주시면 됩니다.



const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const getPlanner = async (req, res) => {
    try {
      const userId = req.query.user_id;
      const data = await pool.query(`SELECT * FROM schedule WHERE user_id = '${userId}'`);
      res.json(data[0]);
    } catch (error) {
      res.status(500).json({ error: '데이터를 검색하는 중 오류가 발생했습니다.' });
    }
};
  
  const postPlanner = (req, res) => {
    // 입력받은 planner를 DB에 저장하는 코드
    const { id, title, period_start, period_end } = req.body;
    connection.execute(
      "INSERT INTO planner (user_id, planner_name, start_time, end_time) VALUES (?, ?, ?, ?)",
      [id, title, period_start, period_end],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: '플래너를 추가하는 중 오류가 발생했습니다.' });
        } else {
          res.sendStatus(200);
        }
      }
    );
  };
  
  const deletePlanner = (req, res) => {
    // 플래너를 삭제합니다.
    const id = req.params.id;
  
    // 해당 플래너의 ID를 받으면, 그 플래너를 DB에서 찾아 삭제합니다.
    connection.execute(
      "DELETE FROM planner WHERE user_id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: '플래너를 삭제하는 중 오류가 발생했습니다.' });
        } else {
          res.sendStatus(200);
        }
      }
    );
  };
  
  const updatePlanner = (req, res) => {
    // 수정할 내용에 따라 SQL UPDATE 쿼리를 작성합니다.
    const id = req.params.id;
  
    // 해당 플래너의 ID를 받으면, 그 플래너를 DB에서 수정합니다.
    connection.execute(
      "UPDATE planner SET ... WHERE user_id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: '플래너를 업데이트하는 중 오류가 발생했습니다.' });
        } else {
          res.sendStatus(200);
        }
      }
    );
  };
  
  export { getPlanner, postPlanner, deletePlanner, updatePlanner };