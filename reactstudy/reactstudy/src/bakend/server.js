import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import router from "./router.js";
import crypto from "crypto";
import mysql from "mysql2/promise";

const app = express();
const port = 80;

// MySQL 연결
const db = await mysql.createConnection({
  host: 'jhdb98.cuy7pwybpmhj.ap-northeast-2.rds.amazonaws.com',
  user: 'manager2',
  password: 'manager2!',
  database: 'testusers',
});

// 미들웨어 설정
app.use(cors({ origin: "http://localhost:3000", methods: "GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE", credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    expiration: 3600000,
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
    },
    store: new MySQLStore({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATA_BASE,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport LocalStrategy 설정
passport.use(
  new LocalStrategy(
    {
      usernameField: "user_id",
      passwordField: "user_pw",
    },
    (user_id, user_pw, done) => {
      db.query(
        "SELECT * FROM users WHERE signup_id = ?",
        [user_id],
        (err, results) => {
          if (err) {
            console.log("LocalStrategy MySQL Error", err);
            return done(err);
          }
          if (!results[0]) {
            return done(null, false, { message: "사용자를 찾을 수 없습니다." });
          }
          const user = results[0];

          const inputPasswordHash = crypto
            .createHash("sha256")
            .update(user_pw)
            .update(user.salt)
            .digest("base64");
          if (inputPasswordHash === user.signup_password) {
            console.log("LocalStrategy : ", user);
            done(null, user);
          } else {
            console.log("비밀번호가 일치하지 않습니다.");
            return done(null, false, {
              message: "비밀번호가 일치하지 않습니다.",
            });
          }
        }
      );
    }
  )
);

// 사용자 정보를 세션에 저장
passport.serializeUser((user, done) => {
  console.log("serializeUser : ", user);
  done(null, user.id);
});

// 세션에서 사용자 정보 가져오기
passport.deserializeUser((id, done) => {
  console.log("deserializeUser : ", id);

  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) done(err);
    if (!results[0]) done(err);

    var user = results[0];
    done(null, user);
  });
});

// 라우터 등록
app.use("/", router);

// 로그인, 로그아웃 엔드포인트
app.post("/api/login_page", loginHandler.login);
app.get("/api/login_success", (req, res) => {
  console.log("로그인 성공!");
  res.status(200).json({ message: "로그인 성공", success: true });
});
app.get("/api/login_failure", (req, res) => {
  console.log("로그인 실패");
  res.status(500).json({ message: "로그인 실패", success: false });
});
app.get("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "로그아웃 성공", success: true });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});