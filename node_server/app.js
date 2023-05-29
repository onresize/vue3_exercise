const express = require("express");
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

//监听5000端口
let host = "127.0.0.1";
let port = 5000;
const serverUrl = `${host}:${port}`;
const httpStr = 'http://'

// 青牛云上传
const qiniu = require('./qiniu.js')

// 声明一个变量，保存所有数据（其实数据是保存到内存里）
var allGood = []

// 获取提交参数
const bodyParser = require("body-parser");
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });


var app = express();
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

// 静态服务器
// app.use(express.static(__dirname + '/public')); // 这一句好像没生效，不知为什么
// app.use(express.static('public'));
// 视频流

// const {stat} = require('fs').promises
// 原文链接：https://blog.csdn.net/qq_43505774/article/details/118971681


app.get("/", function (req, res) {
  res.end('hello server!')
})

//新增商品
app.post('/uploadFWQ', (req, res) => {
  try {
    let imgUrl;
    // 数据处理部分
    let form = new formidable.IncomingForm();
    //设置文件上传后保存的路径
    let imgPath = 'public'
    form.uploadDir = path.join(__dirname, imgPath);
    let uploadDir = path.join(__dirname, imgPath);
    //保留原始文件的扩展名
    form.keepExtensions = true;
    form.parse(req, async function (err, fields, files) {
      console.log('err, fields, files:', err, fields, files)
      // 为上传的文件重命名：其中files.file.path可以获取文件的上传路径
      if (files.hasOwnProperty('file')) {
        let oldPath = files.file.path
        let filename = new Date().toLocaleTimeString() + files.file.name
        let newPath = path.join(uploadDir, filename)
        // 更新图片地址 /public
        imgUrl = path.join(serverUrl, imgPath, filename)
        fields.goodImg = httpStr + imgUrl;
        // 将文件保存到服务器的某个目录
        fs.renameSync(oldPath, newPath)
      }

      // 此处将数据保存到数据库
      let backRel = fields;
      backRel._id = Date.now();
      // 保存最新数据
      allGood.push(backRel);
      console.log('-update-good123:', backRel);
      let data = {
        error: 0,
        msg: '新增商品成功',
        data: JSON.parse(backRel)
      }
      res.end(JSON.stringify(data))
    })
  } catch (error) {
    let data = {
      error: 1,
      msg: '新增商品出错！'
    }
    res.end(JSON.stringify(data))
  }

})

// 青牛云上传token
app.post('/token', (req, res) => {
  let token = new qiniu().uploadToken()
  res.status(200).send(token)
})


app.listen(port, () => {
  console.log(`服务已运行: ${host}:${port}`);
});
