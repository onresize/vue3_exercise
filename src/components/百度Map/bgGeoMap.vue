<template>
  <div id="MapContainer" class="Map"></div>
</template>

<script setup lang="ts">
import { reactive, nextTick } from "vue";
import { BMPGL } from "./bmp";

let Props = defineProps(["JsonData"]);

const initMap = async () => {
  console.log("initMap--", Props.JsonData);
  await nextTick();
  const BMapGL: any = await BMPGL("BLotgPFWt0GYbiBMcZ0rr3XvQP0cu32d");
  console.log("加载地图--------->", BMapGL);
  var map = new BMapGL.Map("MapContainer", {
    coordsType: 5, // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
    // 指定完成后API将以指定的坐标类型处理您传入的坐标
  }); // 创建地图实例
  var point = new BMapGL.Point(115.892163, 28.898898); // 创建点坐标
  map.centerAndZoom(point, 14); // 初始化地图，设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  let geojson: any = Props.JsonData;

  //创建GeoJSON图层，并将其添加到地图中
  var geojsonLayer = new BMapGL.GeoJSONLayer("id123", {
    dataSource: geojson,
    reference: "WGS84",
  });
  map.addGeoJSONLayer(geojsonLayer);
};

initMap();
</script>

<style lang="less">
#MapContainer {
  height: calc(100%);
}
#MapContainer .BMap_cpyCtrl {
  display: none;
}
#MapContainer .anchorBL {
  display: none;
}
</style>
