const express = require("express");
const app = express();

// 解决非同源3077端口跨域
app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3077");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/anotherService", (req, res) => {
  res.json({ code: 0, msg: "这是8003端口返回的" });
});

app.listen("8003", () => {
  console.log("http服务开启2: http://localhost:8003");
});
