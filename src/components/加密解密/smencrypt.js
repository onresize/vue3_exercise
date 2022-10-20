import { sm2, sm3, sm4 } from "sm-crypto";

let keypair = sm2.generateKeyPairHex("daac25c1512fe50f79b0e4526b93f5c0e1460cef40b6dd44af13caec62e8c60e0d885f3c6d6fb51e530889e6fd4ac743a6d332e68a0f2a3923f42585dceb93e9");
const publicKey = keypair.publicKey
const privateKey = keypair.privateKey
const key = '0123456789abcdeffedcba9876543210'
const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1

export function sm2Encrypt(msgString) {
  return sm2.doEncrypt(msgString, publicKey, cipherMode)
}
export function sm2Decrypt(encryptData) {
  return sm2.doDecrypt(encryptData, privateKey, cipherMode)
}


// export function sm3Encrypt(msgString) {
//   return sm3(msgString)
// }
// export function sm3Decrypt(encryptData) {
//   return sm3(encryptData)
// }


// export function sm4Encrypt(msgString) {
//   return sm4.encrypt(msgString, key)
// }
// export function sm4Decrypt(encryptData) {
//   return sm4.decrypt(encryptData, key)
// }