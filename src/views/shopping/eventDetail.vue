<template>
  <div id="app">
    <div class="location-container">
      <h2>Location</h2>
      <p>Current location: {{ location }}</p>
      <p>Nearby place: {{ nearbyPlace }}</p>
      <button @click="getAddress">获取当前位置地址</button>
      <div class="map-container" ref="mapContainer">
        <!-- 地图将在这里渲染 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
// 引入 AMapLoader
import AMapLoader from "@amap/amap-jsapi-loader";

export default defineComponent({
  name: "LocationMap",
  setup() {
    const mapContainer = ref<HTMLElement | null>(null); // 地图容器的引用
    const location = ref<string>("尚未定位"); // 当前定位信息
    const nearbyPlace = ref<string>("尚未查询"); // 附近文字位置
    const currentLng = ref<number | null>(null); // 当前经度
    const currentLat = ref<number | null>(null); // 当前纬度

    // 页面加载时加载高德地图并获取当前定位
    onMounted(() => {
      // 使用 AMapLoader 加载高德地图 SDK 和相关插件
      AMapLoader.load({
        key: "70aa10ce5670862ae22a6ae40f524f39", // 你的API密钥
        version: "2.0", // 指定要加载的 JSAPI 的版本
        plugins: ["AMap.Geolocation", "AMap.Geocoder", "AMap.Marker"], // 需要使用的插件列表
      })
        .then((AMap) => {
          // 初始化地图
          const map = new AMap.Map(mapContainer.value!, {
            zoom: 14, // 地图缩放级别
          });

          // 创建定位对象
          const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 启用高精度定位
            timeout: 10000, // 超时时间
          });

          // 获取定位
          geolocation.getCurrentPosition((status, result) => {
            if (status === "complete") {
              const { position } = result;
              const lng = position.getLng();
              const lat = position.getLat();
              location.value = `经度: ${lng}, 纬度: ${lat}`;
              currentLng.value = lng;
              currentLat.value = lat;

              // 设置地图中心
              map.setCenter([lng, lat]);

              // 在当前位置添加标记
              new AMap.Marker({
                position: [lng, lat],
                map: map,
              });
            } else {
              location.value = "定位失败";
            }
          });
        })
        .catch((e) => {
          console.error("高德地图加载失败", e);
        });
    });

    // 用户点击按钮后获取当前位置的文字描述
    const getAddress = () => {
      if (currentLng.value && currentLat.value) {
        // 使用 AMap.Geocoder 进行逆地理编码
        AMapLoader.load({
          key: "70aa10ce5670862ae22a6ae40f524f39", // 你的API密钥
          version: "2.0", // 指定要加载的 JSAPI 的版本
          plugins: ["AMap.Geocoder"], // 加载逆地理编码插件
        }).then((AMap) => {
          const geocoder = new AMap.Geocoder({
            radius: 1000, // 设置搜索半径为1000米
          });

          geocoder.getAddress(
            [currentLng.value, currentLat.value],
            (status, result) => {
              if (status === "complete") {
                const address = result.regeocode.formattedAddress;
                console.log("地址:", address); // 打印逆地理编码的地址
                nearbyPlace.value = `附近位置: ${address}`;
              } else {
                console.error("逆地理编码失败:", status, result);
                nearbyPlace.value = "无法获取地址";
              }
            }
          );
        });
      } else {
        nearbyPlace.value = "请先获取定位";
      }
    };

    return { mapContainer, location, nearbyPlace, getAddress };
  },
});
</script>

<style scoped>
.location-container {
  text-align: center;
  color: #fff;
  background-color: #000;
  padding: 20px;
}

.map-container {
  width: 100%;
  height: 400px; /* 可以根据需要调整地图的高度 */
}
</style>
