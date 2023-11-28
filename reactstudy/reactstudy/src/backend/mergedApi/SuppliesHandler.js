
import mysql from "mysql2/promise.js"
import { DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USER } from "./env.js"

// mySql db에 연결, 각 항목별로 입력해주시면 됩니다.

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

const getSupplies = async (req, res) => {
    try {
        const userId = req.query.user_id;
        // SQL 쿼리에는 변수를 사용하므로 반드시 프리페어드 스타일 쿼리를 사용해야 합니다.
        const [rows, fields] = await db.query('SELECT * FROM supplies WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '데이터를 검색하는 중 오류가 발생했습니다.' });
    }
};
  
  const postSupplies = async (req, res) => {
    try {
        const [rows, fields] = await db.query(`INSERT INTO supplies (title, checked, planner_id, user_id)
        VALUES (?, ?, ?, ?)`, [req.body.title, req.body.checked, req.body.planner_id, req.body.user_id]);
        console.log(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  const deleteSupplies = async (req, res) => {
    try {
        const { title, checked, planner_id, user_id } = req.body;

        const [rows, fields] = await db.query(
            'DELETE FROM supplies WHERE title = ? AND checked = ? AND planner_id = ? AND user_id = ?',
            [title, checked, planner_id, user_id]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  const updateSupplies = async (req, res) => {
    try {
        const { checked, editchecked, edittitle, planner_id, title, user_id } = req.body;

        console.log(req.body);
        console.log(checked, editchecked, edittitle, planner_id, title, user_id );

        const [rows, fields] = await db.query(
            `UPDATE supplies SET title = ?, checked = ? WHERE title = ? AND checked = ? AND planner_id = ? AND user_id = ?`,
            [edittitle, editchecked, title, checked, planner_id, user_id]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  export { getSupplies, postSupplies, deleteSupplies, updateSupplies };
