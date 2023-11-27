
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
  
  const db = await createConnection();

const getExpense = async (req, res) => {
    try {
        const userId = req.query.user_id;
        // SQL 쿼리에는 변수를 사용하므로 반드시 프리페어드 스타일 쿼리를 사용해야 합니다.
        const [rows, fields] = await db.query('SELECT * FROM expense WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '데이터를 검색하는 중 오류가 발생했습니다.' });
    }
};
  
  const postExpense = async (req, res) => {
    try {
        const [rows, fields] = await db.query(`INSERT INTO expense (title, budget, planner_id, user_id)
        VALUES (?, ?, ?, ?)`, [req.body.title, req.body.budget, req.body.planner_id, req.body.user_id]);
        console.log(req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  const deleteExpense = async (req, res) => {
    try {
        const { title, budget, planner_id, user_id } = req.body;

        const [rows, fields] = await db.query(
            'DELETE FROM expense WHERE title = ? AND budget = ? AND planner_id = ? AND user_id = ?',
            [title, budget, planner_id, user_id]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  const updateExpense = async (req, res) => {
    try {
        const { budget, editbudget, edittitle, planner_id, title, user_id } = req.body;

        const [rows, fields] = await db.query(
            `UPDATE expense SET title = ?, budget = ? WHERE title = ? AND budget = ? AND planner_id = ? AND user_id = ?`,
            [edittitle, editbudget, title, budget, planner_id, user_id]
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
  };
  
  export { getExpense, postExpense, deleteExpense, updateExpense };
