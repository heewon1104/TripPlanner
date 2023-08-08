var express = require("express");
var mysql = require("mysql");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
var bodyParser = require("body-parser");
var bkfd2Password = require("pbkdf2-password");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var hasher = bkfd2Password();

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //express는 post를 처리해주지 않기때문
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "tripplanner",
});
conn.connect();

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: "localhost",
      port: 3306,
      user: "root",
      database: "tripplanner",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  //최초 로그인에 성공하면 session에 등록됨
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  //이미 로그인에 성공한 user가 재접근 하면 실행됨
  var sql = "SELECT* FROM user WHERE id=?";
  conn.query(sql, [id], function (err, results) {
    if (err) {
      console.log(err);
      done("There is no user...");
    } else {
      done(null, results[0]);
    }
  });
});
passport.use(
  new LocalStrategy(function (username, password, done) {
    var uname = username;
    var pwd = password;
    var sql = "SELECT * FROM user WHERE id=?";
    conn.query(sql, ["local:" + uname], function (err, results) {
      if (err) {
        return done("There is no user.");
      }

      var user = results[0];
      return hasher(
        { password: pwd, salt: user.salt },
        function (err, pass, salt, hash) {
          if (hash === user.pw) {
            done(null, user); //passport.serializeUser()를 통해 등록한 callback함수가 실행됨
          } else {
            done(null, false);
          }
        }
      );
    });
  })
);

app.get("/", function (req, res) {
  var output = `
      <h1>Welcome to Trip Planner!</h1>
        <a href='/auth/login'>Log In</a>
        <a href='/auth/register'>Register</a>
      `;
  res.send(output);
});

app.post("/auth/register", function (req, res) {
  hasher({ password: req.body.password }, function (err, pass, salt, hash) {
    var user = {
      id: "local:" + req.body.username,
      pw: hash,
      salt: salt,
      nickname: req.body.nickName,
    };
    var sql = "INSERT INTO user SET ?";
    conn.query(sql, user, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500);
      } else {
        req.login(user, function (err) {
          req.session.save(function () {
            res.redirect("/auth/login_success");
          });
        });
      }
    });
  });
});

app.get("/auth/register", function (req, res) {
  var output = `
      <h1>Register</h1>
      <form action="/auth/register" method="post">
          <p>
              <input type="text" name="username" placeholder="username">
          </p>
          <p>
              <input type="password" name="password" placeholder="password">
          </p>
          <p>
              <input type="text" name="nickName" placeholder="nickName">
          </p>
          <p>
              <input type="submit" value="Register">
          </p>
      </form>
      `;
  res.send(output);
});

app.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/auth/login_success",
    failureRedirect: "/auth/login",
    failureFlash: false,
  })
);
// app.post("/auth/login", function (req, res) {
//   var id = req.body.username;
//   var pwd = req.body.password;
//   for (var i = 0; i < users.length; i++) {
//     var user = users[i];
//     if (id === user.username) {
//       return hasher(
//         { password: pwd, salt: user.salt },
//         function (err, pass, salt, hash) {
//           if (hash === user.password) {
//             req.session.nickname = user.nickname;
//             return req.session.save(function () {
//               res.redirect("/auth/login_success");
//             });
//           } else {
//             res.redirect("/auth/login_success");
//           }
//         }
//       );
//     }
//   }
//   res.send("Who are you? <a href='/auth/login'>login</a>");
// });

app.get("/auth/login", function (req, res) {
  var output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
        <p>
            <input type="text" name="username" placeholder="username">
        </p>
        <p>
            <input type="password" name="password" placeholder="password">
        </p>
        <p>
            <input type="submit" value="Log In">
        </p>
    </form>
    `;
  res.send(output);
});

app.get("/auth/login_success", function (req, res) {
  if (req.user && req.user.nickname) {
    //deserializeUser done함수의 두번째 인자 user를 뜻함
    res.send(`
        <h1>Hello, ${req.user.nickname}</h1>
        <a href='/auth/logout'>logout</a>
    `);
  } else {
    res.send(`
        <h1>Welcome</h1>
        <a href='/auth/login'>login</a>
    `);
  }
});

app.get("/auth/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.save(function () {
      res.redirect("/auth/login");
    });
  });
});

app.listen(3000, function () {
  console.log("Connected 3000 port.");
});
