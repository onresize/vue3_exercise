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
        client_secret: "24c1d6fd541ed762477a6e9e24ce17dcfba59125064afa398709f25552d89ce2",
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
