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

// TEST
const getWallpaper1 = () => {
  return awaitTo(
    server({
      url: "",
      method: "GET",
    })
  );
};

// export { getWallpaper, getWallpaper1 }
export default { getWallpaper, getWallpaper1 }
