import express from "express";
import path from "path";
import cors from "cors";


require("dotenv").config()

const router = require("../backend/routes/Router")

const port = process.env.PORT;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false})); 

app.use(cors({origin: "http:localhost:3000"}))
app.use("/uploads", express.static(path.join(__dirname, "/uploads")))


app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})