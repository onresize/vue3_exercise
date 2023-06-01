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

// XXX设置访问服务器静态文件、static下的静态图片不需要加上static直接'/xxx.jpg'
// 参考： https://www.cnblogs.com/kebaoye/p/16113975.html
// app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static('static'));



// 视频流
// const {stat} = require('fs').promises
// 原文链接：https://blog.csdn.net/qq_43505774/article/details/118971681


app.get("/", function (req, res) {
  res.end('hello server!')
})

// 上传到服务器文件夹
app.post('/uploadFWQ', (req, res) => {
  let cacheFolder = 'static'
  if (!fs.existsSync(cacheFolder)) {
    fs.mkdirSync(cacheFolder)
  }

  let form = new formidable.IncomingForm();
  form.encoding = 'utf-8'; //设置编辑
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
    let extName = ''
    switch (files?.file?.type) {
      case 'image/jpeg':
        extName = 'jpg';
        break;
      case 'image/jpg':
        extName = 'jpg';
        break;
      case 'image/png':
        extName = 'png';
        break;
    }
    if (extName.length === 0) {
      res.send({
        code: 202,
        msg: '只支持png和jpg格式图片'
      })
      return
    } else {
      if (files.file.path.length) {
        let picName = files.file.path.substr(7)
        let newPath = form.uploadDir + '/' + picName;
        displayUrl = `http://localhost:5000/${picName}`

        fs.renameSync(files.file.path, newPath);
        res.send({
          code: 200,
          path: displayUrl
        })
      }
    }
  })
})

// 青牛云上传token
app.post('/token', (req, res) => {
  let token = new qiniu().uploadToken()
  res.status(200).send(token)
})


app.listen(port, () => {
  console.log(`服务已运行: ${host}:${port}`);
});
