const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const bodyParser = require("body-parser");
const crypto = require("crypto");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 80;

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATA_BASE,
});

// MySQL 연결 테스트
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Middleware 설정
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_KEY, // 세션 암호화를 위한 비밀 키
    resave: false,
    saveUninitialized: true,
    expiration: 3600000, // 세션 만료 시간 (1시간)
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
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE",
    credentials: true,
    allowedHeaders: "Content-Type",
  })
);

// Passport LocalStrategy 설정
passport.use(
  new LocalStrategy(
    {
      usernameField: "user_id", // 사용자 ID 필드 이름
      passwordField: "user_pw", // 비밀번호 필드 이름
    },
    (user_id, user_pw, done) => {
      console.log("passport: local-login 호출");

      // MySQL에서 사용자 정보 조회
      db.query(
        "SELECT* FROM users WHERE signup_id = ?",
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

  //MySQL에서 사용자 정보 조회
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) done(err);
    if (!results[0]) done(err);

    var user = results[0];
    done(null, user);
  });
});

// 로그인 엔드포인트
app.post(
  "/api/login_page",
  bodyParser.json(),
  passport.authenticate("local", {
    successRedirect: "/api/login_success",
    failureRedirect: "/api/login_failure",
  })
);

// 로그인 성공 시 처리
app.get("/api/login_success", (req, res) => {
  console.log("로그인 성공!");
  res.status(200).json({ message: "로그인 성공", success: true });
});

// 로그인 실패 시 처리
app.get("/api/login_failure", (req, res) => {
  console.log("로그인 실패");
  res.status(500).json({ message: "로그인 실패", success: false });
});

// 로그아웃 엔드포인트
app.get("/api/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "로그아웃 성공", success: true });
});
