const express = require("express");
const path = require("path");
const app = express();
// const { Sequelize, DataTypes } = require("sequelize");
const { router } = require("./routers/root-router");
const port = 2222;
//setup static file
const publicPathDirectory = path.join(__dirname, "./");
app.use(express.static(publicPathDirectory));
// chuyển req sang json
app.use(express.json());


app.use("/router", router);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Running at port ${port}`);
});


