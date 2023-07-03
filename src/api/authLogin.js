import { awaitTo } from "@/utils/awaitTo.js";
import { server } from "@/utils/request.js";

// 获取gitee_token
export const giteeLoginApi = (data) => {
  return awaitTo(
    server({
      url: "/gitee/oauth/token?grant_type=authorization_code",
      method: "POST",
      data: {
        client_id: "9b6db952f18a91f9cb551f1da7c4d51c43e8a37c7f0172ba1c82f80bd51ed7c0",
        client_secret: "c936fd4fc7a7af36194182b91a8e7ad58f30024f6cd05bcb308a205f9712d854",
        redirect_uri: "http://127.0.0.1:3077/welcome",
        response_type: "code",
        ...data,
      },
    })
  );
};

// gitee授权
export const giteeAuthApi = (params) => {
  return awaitTo(
    server({
      url: "/gitee/api/v5/user",
      method: "GET",
      params,
    })
  );
};

// 网易云扫码登录-获取生成二维码地址必要的key
export const qrCodeLoginKey = (timestamp) => {
  return awaitTo(
    server({
      url: "/163/login/qr/key?timestamp=" + timestamp,
      method: "GET",
    })
  );
};

// 网易云扫码登录-生成二维码
export const qrCodeLoginImg = (key) => {
  return awaitTo(
    server({
      url: "/163/login/qr/create?qrimg=true&key=" + key,
      method: "GET",
    })
  );
};

// 网易云扫码登录-二维码检测扫码状态
export const qrCodeLoginCheck = (key, timestamp) => {
  return awaitTo(
    server({
      url: "/163/login/qr/check?key=" + key + "&timestamp=" + timestamp,
      method: "GET",
    })
  );
};

// 网易云-获取登录状态
export const loginStatus = () => {
  return awaitTo(
    server({
      url: "/163/login/status",
      method: "GET",
    })
  );
};

// 网易云-获取用户信息
export const subcount = () => {
  return awaitTo(
    server({
      url: "/163/user/subcount",
      method: "GET",
    })
  );
};

// 网易云-获取用户喜欢音乐列表
export const likelist = (userId) => {
  return awaitTo(
    server({
      url: "/163/likelist?uid=" + userId,
      method: "GET",
    })
  );
};

// 网易云-获取用户音乐url
export const songUrl = (songId) => {
  return awaitTo(
    server({
      url: "/163/song/url?id=" + songId,
      method: "GET",
    })
  );
};
// 网易云-获取私人FM
export const personalFm = () => {
  return awaitTo(
    server({
      url: "/163/personal_fm",
      method: "GET",
    })
  );
};
