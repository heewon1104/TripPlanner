import express from "express";
import router from "./router.js";
import cors from "cors";

const app = express();
const PORT = 82;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
