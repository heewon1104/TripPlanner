import express from "express"
import router from "./router.js"

const app = express()
const PORT = 80

app.use(express.json())
app.use(express.urlencoded({extended : "true"}));
app.use('/' , router)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})
