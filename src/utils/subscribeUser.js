import axios from "axios";
import { useMainStore } from "@/store/pinia.ts";

const PiniaStore = useMainStore();
const registration = await navigator.serviceWorker.register("/js/serviceWorker.js");

// Service Worker 消息订阅
async function subscribeUser() {
  try {
    const status = await Notification.requestPermission();
    // 测试网址(需要开启科学上网、将下面JSON.stringify(pushSubscription)粘贴到Subscription to Send To、设置好Text to Send就能发送了)： https://web-push-codelab.glitch.me/
    if (status === "granted") {
      const vapidPublicKey = "BJncXlm1U_biqNaBfCk5767GZ9IFvTfbXHwYSSdH8t_cEmGwHMjJTCQwolZV52oIfqKVzl8vtUmL0YMUcMZfIUw";
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      // 防止 DOMException: Failed to execute 'subscribe' on 'PushManager': Subscription failed - no active Service Worker
      if (!registration.active) {
        // 等待变为激活状态
        await new Promise((r) => setTimeout(r, 500));
      }
      const pushSubscription = await registration.pushManager.subscribe({
        applicationServerKey: convertedVapidKey, // 来自服务器的公钥
        userVisibleOnly: true, // 这个表示消息是否必须要可见，如果设置为不可见，Chrome将会报错：
      });
      console.log(JSON.stringify(pushSubscription)); // 这个消息可用于服务端发起推送

      return new Promise((resolve, rej) => {
        PiniaStore.changeJsonKey(JSON.stringify(pushSubscription));
        resolve();
      });
      // const res = await axios({
      //   url: "http://localhost:5000/postMessage",
      //   method: "POST",
      //   data: { pushSubscription: JSON.stringify(pushSubscription) },
      // });
      // console.log("获取postMessage接口返回结果：", res);
    }
  } catch (err) {
    console.log(err);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export { subscribeUser };
