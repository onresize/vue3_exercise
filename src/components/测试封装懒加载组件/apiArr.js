export function findNew(pageNum) {
  return new Promise((res, rej) => {
    console.log('当前请求页数：', pageNum)
    if (pageNum == 1) {
      res({
        result: [
          {
            title: "img8",
            src: new URL("@/assets/lazyPic/9.jpg", import.meta.url).href,
          },
          {
            title: "img9",
            src: new URL("@/assets/lazyPic/10.jpg", import.meta.url).href,
          },
          {
            title: "img10",
            src: new URL("@/assets/lazyPic/11.jpg", import.meta.url).href,
          },
          {
            title: "img11",
            src: new URL("@/assets/lazyPic/12.jpg", import.meta.url).href,
          },
        ]
      })
    }
    if (pageNum == 2) {
      res({
        result: [
          {
            title: "img12",
            src: new URL("@/assets/lazyPic/13.jpg", import.meta.url).href,
          },
          {
            title: "img13",
            src: new URL("@/assets/lazyPic/14.jpg", import.meta.url).href,
          },
          {
            title: "img14",
            src: new URL("@/assets/lazyPic/15.jpg", import.meta.url).href,
          },
          {
            title: "img15",
            src: new URL("@/assets/lazyPic/16.jpg", import.meta.url).href,
          },
        ]
      })
    }
    if (pageNum == 3) {
      res({
        result: [
          {
            title: "img16",
            src: new URL("@/assets/lazyPic/17.jpg", import.meta.url).href,
          },
          {
            title: "img17",
            src: new URL("@/assets/lazyPic/18.jpg", import.meta.url).href,
          },
          {
            title: "img18",
            src: new URL("@/assets/lazyPic/19.jpg", import.meta.url).href,
          },
          {
            title: "img19",
            src: new URL("@/assets/lazyPic/20.jpg", import.meta.url).href,
          },
        ]
      })
    }
    if (pageNum == 4) {
      res({
        result: [
          {
            title: "img20",
            src: new URL("@/assets/lazyPic/21.jpg", import.meta.url).href,
          },
          {
            title: "img21",
            src: new URL("@/assets/lazyPic/22.jpg", import.meta.url).href,
          },
          {
            title: "img22",
            src: new URL("@/assets/lazyPic/23.jpg", import.meta.url).href,
          },
          {
            title: "img23",
            src: new URL("@/assets/lazyPic/24.jpg", import.meta.url).href,
          },
          {
            title: "img24",
            src: new URL("@/assets/lazyPic/25.jpg", import.meta.url).href,
          },
          {
            title: "img25",
            src: new URL("@/assets/lazyPic/26.jpg", import.meta.url).href,
          }
        ]
      })
    }
  })
}
