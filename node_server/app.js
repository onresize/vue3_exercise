const express = require("express");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const http = require("http");
const WebPush = require("web-push"); // 推送消息给前端

//监听5000端口
let host = "127.0.0.1";
let port = 5000;
const serverUrl = `${host}:${port}`;
const httpStr = "http://";

const WebSocketServer = require("./websocket").WebSocketServer;
const port1 = 2048; //端口
const pathname = "/ws/"; //访问路径
const server = http.createServer();
const clientKey = "name"; //客户端标识符

// 青牛云上传
const qiniu = require("./qiniu.js");

// 获取提交参数
const bodyParser = require("body-parser");
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();
app.use(bodyParser()); // 设置这个、解决post接口拿到前端参数req.body不再会是undefined

//设置允许跨域访问该服务.
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  // 中文乱码解决
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Content-Type", "multipart/form-data");
  next();
});

// XXX设置访问服务器静态文件、static下的静态图片不需要加上static直接'/xxx.jpg'
// 参考： https://www.cnblogs.com/kebaoye/p/16113975.html
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static("static"));

// 视频流
// const {stat} = require('fs').promises
// 原文链接：https://blog.csdn.net/qq_43505774/article/details/118971681

app.get("/", function (req, res) {
  res.end("hello server!");
});

// 上传到服务器文件夹
app.post("/uploadFWQ", (req, res) => {
  let cacheFolder = "static";
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder);
  }

  let form = new formidable.IncomingForm();
  form.encoding = "utf-8"; //设置编辑
  form.uploadDir = cacheFolder; //设置上传目录
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
  form.type = true;
  let displayUrl;
  form.parse(req, function (err, fields, files) {
    if (err) {
      res.send(err);
      return;
    }
    let extName = "";
    switch (files?.file?.type) {
      case "image/jpeg":
        extName = "jpg";
        break;
      case "image/jpg":
        extName = "jpg";
        break;
      case "image/png":
        extName = "png";
        break;
    }
    if (extName.length === 0) {
      res.send({
        code: 202,
        msg: "只支持png和jpg格式图片",
      });
      return;
    } else {
      if (files.file.path.length) {
        let picName = files.file.path.substr(7);
        let newPath = form.uploadDir + "/" + picName;
        displayUrl = `http://localhost:5000/${picName}`;

        fs.renameSync(files.file.path, newPath);
        res.send({
          code: 200,
          path: displayUrl,
        });
      }
    }
  });
});

// 青牛云上传token
app.post("/token", (req, res) => {
  let token = new qiniu().uploadToken();
  res.status(200).send(token);
});

// 测试同源请求携带cookie
app.get("/login", (req, res) => {
  res.cookie("user", "jay", { maxAge: 2000000, httpOnly: true });
  res.json({ code: 0, message: "登录成功" });
});
app.get("/user", (req, res) => {
  console.log("/user==>", req.headers.cookie);
  const user = req.headers.cookie?.split("=")[1];
  res.json({ code: 0, user });
});

// 获取客服端传参的pushSubscription、用于service Worker的消息推送
app.post("/postMessage", (req, res) => {
  const body = req.body;
  if (body) {
    let pushSubscription = JSON.parse(body.pushSubscription); // web_push必要的publicKey
    console.log("接受前端返回的body参数pushSubscription=====>：", pushSubscription);

    // push的数据
    const payload = {
      title: "一个新的消息",
      body: "点开看看吧",
      data: { url: "https://bilibili.com" },
      icon: "https://bpic.588ku.com/art_water_pic/19/10/29/a756dcfb2525c60398d3120d8c77c4ba.jpg",
    };

    // FIXME:这里暂未实现发送消息window接收到到消息通知
    // 1、Web Push 使用了 GCM 服务，而 GCM 在国内基本上很难连通，国内用户除非翻了，否则压根不可能订阅成功 Chrome 的 Web Push。
    // 2、谷歌要求 Chrome 的 Web Push 必须用 https 加密传输，国内目前很多网站还在使用http协议。
    WebPush.sendNotification(
      {
        endpoint: pushSubscription["endpoint"],
        expirationTime: pushSubscription["expirationTime"],
        keys: pushSubscription["keys"],
      },
      JSON.stringify(payload)
    );

    res.send({
      code: 200,
      message: "获取客户端返回的pushSubscription",
      data: body,
    });
  } else {
    res.send({
      code: 200,
      message: "当前没有获取web-push必要参数publicKey",
    });
  }
});

app.listen(port, () => {
  console.log(`http服务开启1: http://${host}:${port}`);
});

// websocket服务
const webSocketServer = new WebSocketServer(
  { noServer: true },
  {
    clientKey,
  }
);

const initSocket = ({ name, req, socket, head }) => {
  webSocketServer.handleUpgrade(req, socket, head, (ws) => {
    ws[clientKey] = name; //添加索引，方便在客户端列表查询某个socket连接
    webSocketServer.addClient(ws);
    webSocketServer.ws = ws;
  });
};

//验证url标准
const checkUrl = (url, key) => {
  //判断url是否包含key
  return url.includes(key);
};

server
  .on("upgrade", (req, socket, head) => {
    //通过http.server过滤数据
    const url = new URL(req.url, `http://${req.headers.host}`);
    const name = url.searchParams.get(clientKey); //获取连接标识
    if (!checkUrl(url.pathname, pathname)) {
      //未按标准
      socket.write("路由未按标准访问");
      socket.pipe(socket);
      return;
    }
    initSocket({ name, req, socket, head });
  })
  .listen(port1, () => {
    console.log(`socket服务开启: ws://${host}:${port1}`);
  });
