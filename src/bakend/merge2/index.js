const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3001;
const crypto = require('crypto');
// const salt = crypto.randomBytes(16).toString('base64'); 여기다 솔트 생성하면 회원가입할때마다 업데이트 안됨, 서버 실행되면 솔트값 고정되는것
const cors = require('cors');
require('dotenv').config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//db 정보 추가

const connection = mysql.createConnection({
    host: 'jhdb98.cuy7pwybpmhj.ap-northeast-2.rds.amazonaws.com',
    user: 'manager2',
    password: 'manager2!',
    database: 'testusers'
});
//db 정보 추가



app.post('/api/signup_page', (req, res) => {
    let name= req.body.signup_name;
    let birth=req.body.signup_birth;
    let gender=req.body.signup_gender;
    let id = req.body.signup_id;
    let password = req.body.signup_password;
    let password2 = req.body.signup_password2;
    let nickname = req.body.signup_nickname;
    let planner = 0;
    // if(!name || !birth || !gender || !id || !password || !password2 || !nickname){
    //     return res.status(400).send({ message: '이름, 생년월일, 아이디, 비밀번호, 닉네임은 필수입력 사항입니다.' });
    // }
    const salt = crypto.randomBytes(16).toString('base64');//여기다 솔트 생성해야 회원가입요청 들어올때마다 솔트 업데이트됨
    let encryptedPassword = crypto.createHash('sha256').update(password).update(salt).digest('base64');
    
    let checknicknamesql = 'SELECT * FROM testusers.users WHERE signup_nickname = ?';
    let checkidsql = 'SELECT * FROM testusers.users WHERE signup_id = ?';

    connection.query(checkidsql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Server error' });
        }

        
        if (results.length > 0) {
            return res.status(400).send({ message: '이미 사용중인 ID 입니다.' });
        }
        
        connection.query(checknicknamesql, [nickname], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: "Server error"});
            }

            if(results.length >0){
                return res.status(400).send({ message: "이미 사용중인 Nickname 입니다."})
            }

            let insertsql='INSERT INTO testusers.users (signup_name, signup_birth, signup_gender, signup_id, signup_password, signup_password2, signup_nickname, salt, planner) values (?,?,?,?,?,?,?,?,?)';
             
            connection.query(insertsql, [name, birth, gender, id, encryptedPassword, encryptedPassword, nickname, salt, planner], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: 'Server error' });
                } 
                
                console.log('사용자 정보가 성공적으로 저장되었습니다.');
                res.status(200).send({ message: '회원가입이 성공적으로 완료되었습니다.', success: true });

                
            });

        })
                        
    });
        
});

