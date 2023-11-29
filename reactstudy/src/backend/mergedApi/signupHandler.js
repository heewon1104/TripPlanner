import mysql from "mysql2/promise.js";
import crypto from 'crypto';
import { DB_HOST, DB_PASSWORD, DB_DATABASE_NAME, DB_USER } from "./env.js"

const createConnection = async () => {
    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE_NAME,
    });

    console.log("db Success");

    return connection;
};

let db;
(async () => {
    db = await createConnection();
})();

const Signup = async (req, res) => {
    try {
        let name = req.body.signup_name;
        let birth = req.body.signup_birth;
        let gender = req.body.signup_gender;
        let id = req.body.signup_id;
        let password = req.body.signup_password;
        let password2 = req.body.signup_password2;
        let nickname = req.body.signup_nickname;
        let planner = 0;

        const salt = crypto.randomBytes(16).toString('base64');
        let encryptedPassword = crypto.createHash('sha256').update(password).update(salt).digest('base64');

        
        // Check ID
        const [idResults] = await db.query('SELECT * FROM users WHERE signup_id = ? LIMIT 1', [id]);

        if (idResults.length > 0) {
            console.log( '이미 사용중인 ID 입니다.');
            return res.status(400).send({ message: '이미 사용중인 ID 입니다.' });
        }

        // Check Nickname
        const [nicknameResults] = await db.query('SELECT * FROM users WHERE signup_nickname = ? LIMIT 1', [nickname]);

        if (nicknameResults.length > 0) {
            console.log( '이미 사용중인 Nickname 입니다.');
            return res.status(401).send({ message: "이미 사용중인 Nickname 입니다." });
        }

        // Insert User
        const [rows, fields] = await db.query(
            'INSERT INTO users (signup_name, signup_birth, signup_gender, signup_id, signup_password, signup_password2, signup_nickname, salt, planner) VALUES (?,?,?,?,?,?,?,?,?)',
            [name, birth, gender, id, encryptedPassword, encryptedPassword, nickname, salt, planner]
        );

        console.log('사용자 정보가 성공적으로 저장되었습니다.');
        res.status(200).send({ message: '회원가입이 성공적으로 완료되었습니다.', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: '서버 오류' });
    }
};

export { Signup };
