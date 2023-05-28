const sdk = require('qiniu');
// https://developer.qiniu.com/kodo/1289/nodejs
class qiniu {
  constructor() {
    this.accessKey = 'UEv9Hdqn1nf-3OZkRPRDyw06pyCdmFGLgk3Br9rr';//此处填写公钥
    this.secretKey = 'dW_QveuFHmb1g-YJ_bhRtVtCOxGFO9jeWpZe7NAB';//私钥
    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    this.options = {
      scope: 'uploadfileslist', // 空间名
      expires: 7200
    }
  }
  //创建上传凭证
  uploadToken() {
    let mac = new sdk.auth.digest.Mac(this.accessKey, this.secretKey);
    let putPolicy = new sdk.rs.PutPolicy(this.options);
    let uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }

  // deleteFile() {
  //     let mac = new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
  //     let config = new qiniu.conf.Config();
  //     //config.useHttpsDomain = true;
  //     config.zone = qiniu.zone.Zone_z2; // 华南
  //     let bucketManager = new sdk.rs.BucketManager(mac, config);

  //     let bucket = 'uploadfileslist';
  //     let key = 'fileWed Nov 16 2022 19:52:12 GMT+0800 (中国标准时间)54.';// 传递文件名

  //     bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
  //         if (err) {
  //             console.log(err);
  //             //throw err;
  //         } else {
  //             console.log(respBody, respInfo) // 最后还是res.end
  //         }
  //     });
  // }
}
module.exports = qiniu
