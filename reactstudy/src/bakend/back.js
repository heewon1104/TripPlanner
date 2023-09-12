import express from "express";
import router from "./router.js";
import cors from "cors";

const app = express()
const PORT = 80

app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트 주소
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE',
    credentials: true, // 필요에 따라 설정
  }));

app.use(express.json())
app.use(express.urlencoded({extended : "true"}));
app.use('/' , router)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})
