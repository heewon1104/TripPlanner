// loginHandler.js
import passport from "passport";
import crypto from "crypto";
import mysql from "mysql2/promise";
import LocalStrategy from "passport-local";

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
        "SELECT * FROM users WHERE user_id = ?",
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

  // MySQL에서 사용자 정보 조회
  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) done(err);
    if (!results[0]) done(err);

    var user = results[0];
    done(null, user);
  });
});

// 로그인 처리 메소드
export const authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "서버 오류", success: false });
    }
    if (!user) {
      return res.status(401).json({ message: "로그인 실패", success: false });
    }

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "서버 오류", success: false });
      }

      return res.status(200).json({ message: "로그인 성공", success: true });
    });
  })(req, res, next);
};

export default passport;
