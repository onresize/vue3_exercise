// 当接收到服务端推送的消息时
self.onpush = (pushEvent) => {
  // 服务器推送的消息文本
  console.log("获取服务器推送的消息文本:", pushEvent.data.text());
  if (!pushEvent.data.text()) {
    var data = pushEvent.data.json();
    // 保持 service worker 活动到显示通知 resolve
    pushEvent.waitUntil(
      // 将服务器推送的消息作为通知显示
      self.registration.showNotification(data?.title, {
        body: data?.body,
        data: { url: data?.url },
        icon: data?.icon,
      })
    );
  } else {
    pushEvent.waitUntil(
      // 将服务器推送的消息作为通知显示
      self.registration.showNotification(pushEvent.data.text())
    );
  }
};
// 点击消息时
self.onnotificationclick = (event) => {
  // NotificationEvent {}, Notification {}
  console.log("点击消息:", event, event.notification);
  // 点击通知后，在新的 tab 打开网页
  clients.openWindow("http://www.bilibili.com");
};
