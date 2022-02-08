const express = require("express");
const path = require("path");
const db = require("./models");
const cors = require("cors");

const app = express();
app.options("*", cors());
const { router } = require("./routers/root-router");
const port = process.env.PORT || 2222;
//setup static file
const publicPathDirectory = path.join(__dirname, "./");
app.use(express.static(publicPathDirectory));
// chuyển req sang json
app.use(express.json());

app.use("/router", router);

app.get("/", (req, res) => {
  res.send("hello world");
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Running at port ${port}`);
  });
});
