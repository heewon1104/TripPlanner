const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;
const crypto = require('crypto');
const salt = crypto.randomBytes(16).toString('base64');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'OYR'
});

app.post('/api/signup_page', (req, res) => {
    let id = req.body.signup_id;
    let password = req.body.signup_password;
    let nickname = req.body.signup_nickname;
    if(!id || !password || !nickname){
        return res.status(400).send({ message: 'id, password, nickname은 필수입력 사항입니다.' });
    }
    let encryptedPassword = crypto.createHash('sha256').update(password).update(salt).digest('base64');
    
    let checknicknamesql = 'SELECT * FROM oyr.users WHERE signup_nickname = ?';
    let checkidsql = 'SELECT * FROM oyr.users WHERE signup_id = ?';

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
                return res.status(500),send({ message: "Server error"});
            }

            if(results.length >0){
                return res.status(400).send({ message: "이미 사용중인 Nickname 입니다."})
            }

            let insertsql='INSERT INTO oyr.users (signup_id, signup_password, signup_nickname) values (?,?,?)';
             
            connection.query(insertsql, [id, encryptedPassword, nickname], (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ message: 'Server error' });
                } 
                
                console.log('사용자 정보가 성공적으로 저장되었습니다.');
                res.status(200).send({ message: '회원가입이 성공적으로 완료되었습니다.' });
                
            });

        })
                        
    });
        
});

