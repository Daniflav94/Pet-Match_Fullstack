import express from "express";
import path from "path";

require("dotenv").config();

const router = require("../backend/routes/Router");
const cors = require('cors');

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header( "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  app.use(cors());
  next();
});
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
