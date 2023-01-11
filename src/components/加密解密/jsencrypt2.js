const CryptoJS = require("crypto-js"); //引用AES源码js
// const CryptoJS = import("crypto-js"); //引用AES源码js

//加密方法
export function Encrypt(word, keyStr) {
  keyStr = keyStr ? keyStr : "juyaokejiabcdefg";
  var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}
//解密
export function Decrypt(word, keyStr) {
  keyStr = keyStr ? keyStr : "juyaokejiabcdefg";
  var key = CryptoJS.enc.Utf8.parse(keyStr); //Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

const key = CryptoJS.enc.Utf8.parse("juyaokejiabcdefg"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("juyaokejiabcdefg"); //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt2(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

//加密方法
export function Encrypt2(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

//加密方法
export function encryptLogin(word, keyStr, ivStr) {
  keyStr = keyStr ? keyStr : "Jy51885559635781";
  ivStr = ivStr ? ivStr : "17865359558158Jy";
  var key = CryptoJS.enc.Utf8.parse(keyStr);
  let iv = CryptoJS.enc.Utf8.parse(ivStr);
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
}
