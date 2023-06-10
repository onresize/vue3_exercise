import { awaitTo } from "@/utils/awaitTo.js";
import { server } from "@/utils/request.js";

const getWallpaper = () => {
  return awaitTo(
    server({
      url: "/api/bing",
      method: "GET",
    })
  );
};

// 获取七牛云token
const getQNYToken = () => {
  return awaitTo(
    server({
      url: "/qny/token",
      method: "POST",
    })
  );
};

// export { getWallpaper }
export default { getWallpaper, getQNYToken };
