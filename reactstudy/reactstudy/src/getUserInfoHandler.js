
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
  
  const db = await createConnection();

const getUserInfo = async (req, res) => {
    try {
        const userId = req.body.user_id;
        const [rows, fields] = await db.query('SELECT * FROM users WHERE signup_id = ?;', [userId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '데이터를 검색하는 중 오류가 발생했습니다.' });
    }
};
  
  export { getUserInfo };
