export default {
  methods: {
    getPie2D(pieData, xData, distance, alpha, pieHeight, opacity = 1) {
      var yData = pieData;
      const option = {
        backgroundColor: "transparent",
        color: ["#0460C4", "#08B2ED", "#88D412", "#F4BE4B", "#F86D47", "#847CBD"],
        // title: {
        //     text: '网络/安全设备',
        //     left: '60',
        //     top: 0,
        //     textAlign: 'center',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: 14,
        //         fontWeight: 0
        //     }
        // },
        grid: {
          left: 20,
          top: 0,
          bottom: 0,
          right: 10,

          containLabel: true,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          // y
          x: "right",
          top: "78%",
          // right: "15",
          bottom: "10%",
          itemWidth: 16,
          itemHeight: 16,
          itemGap: 6,
          textStyle: {
            color: "#A3E2F4",
            fontSize: 12,
            fontWeight: 0,
          },
          //  trigger: "item",
          // formatter: "{value} %",
          data: pieData,
        },
        polar: {},
        angleAxis: {
          interval: 1,
          type: "category",
          data: [],
          z: 10,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#fff",
              width: 10,
              type: "solid",
            },
          },
          axisLabel: {
            interval: 0,
            show: true,
            color: "#0B4A6B",
            margin: 8,
            fontSize: 16,
          },
        },
        radiusAxis: {
          min: 40,
          max: 120,
          interval: 20,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0B3E5E",
              width: 30,
              type: "solid",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            show: false,
            padding: [0, 0, 20, 0],
            color: "#0B3E5E",
            fontSize: 16,
          },
          splitLine: {
            lineStyle: {
              color: "#0B3E5E",
              width: 1,
              type: "solid",
            },
          },
        },
        calculable: true,
        series: [
          {
            type: "pie",
            radius: ["5%", "10%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 55,
              },
              emphasis: {
                show: false,
              },
            },
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#0B4A6B",
                  },
                },
              },
            ],
          },
          {
            type: "pie",
            radius: ["75%", "80%"],
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false,
                length: 30,
                length2: 55,
              },
              emphasis: {
                show: false,
              },
            },
            name: "",
            data: [
              {
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#28353B",
                  },
                },
              },
            ],
          },
          {
            stack: "a",
            type: "pie",
            radius: ["20%", "80%"],
            roseType: "area",
            zlevel: 10,
            label: {
              normal: {
                show: false,
                formatter: "{c}",
                textStyle: {
                  fontSize: 12,
                },
                position: "outside",
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: true,
                length: 20,
                length2: 55,
              },
              emphasis: {
                show: true,
              },
            },
            data: yData,
          },
        ],
      };
      return option;
    },
    sleepFunc(delay) {
      return new Promise((res) => setTimeout(() => res(), delay));
    },
    awaitPromise(resData) {
      return new Promise((res) => {
        setTimeout(() => {
          res(resData);
        }, 0);
      });
    },
    // 截取字符
    toSubstr(str, startNum = 0, endNum) {
      return str.substring(startNum, endNum);
    },
    // 获取url参数
    getQueryString(name) {
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      const r = window.location.search.substr(1).match(reg);
      if (r !== null) {
        return decodeURI(r[2]);
      }
      return null;
    },
    OpenWindow(url, w, h) {
      var left = Math.round((window.screen.availWidth - w) / 2);
      var top = Math.round((window.screen.availHeight - 100 - h) / 2);
      var MyWin = window.open(
        url,
        "",
        "height=" + h + ", width=" + w + ",top=" + top + ",left=" + left + ", toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
      );

      let tim = setInterval(() => {
        console.log("通过定时器进行检测");
        if (MyWin.location?.search?.includes("code")) {
          clearTimeout(tim);
          let codeStr = MyWin.location?.search;
          let code = this.toSubstr(MyWin.location.search, 6, codeStr.length);
          const msg = {
            code,
          };
          console.log("同意授权：", msg);
          MyWin.close(); // 关闭open的窗口
          window.postMessage(msg, "http://localhost:3077/");
        }
      }, 500);
    },
  },
};
