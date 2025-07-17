<template>
  <div class="home_view" v-loading="loading">
    <div class="container">
      <div class="back" @click="$router.back()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M13.1633 15.5867C13.3394 15.7628 13.4384 16.0017 13.4384 16.2508C13.4384 16.4999 13.3394 16.7387 13.1633 16.9148C12.9872 17.091 12.7483 17.2899 12.4992 17.1899C12.2502 17.1899 12.0113 17.091 11.8352 16.9148L5.58519 10.6648C5.49779 10.5777 5.42844 10.4743 5.38112 10.3603C5.33381 10.2463 5.30945 10.1242 5.30945 10.0008C5.30945 9.87739 5.33381 9.75522 5.38112 9.64126C5.42844 9.52731 5.49779 9.42381 5.58519 9.33672L11.8352 3.08672C12.0113 2.9106 12.2502 2.81165 12.4992 2.81165C12.7483 2.81165 12.9872 2.9106 13.1633 3.08672C13.3394 3.26284 13.4384 3.50171 13.4384 3.75078C13.4384 3.99985 13.3394 4.23872 13.1633 4.41484L7.57816 10L13.1633 15.5867Z"
            fill="white"
            fill-opacity="0.8"
            style="fill: white; fill-opacity: 0.8"
          />
        </svg>
        {{ t("back") }}
      </div>
      <div class="container_head">
        <div>New product</div>
        <img src="@/assets/images/shop/img12.png" alt="" />
      </div>
      <div class="Sidebar">
        <div class="SidebarSidebar">
          <div
            v-for="(item, index) in categories"
            :key="index"
            @click="ClickCategory(item)"
            class="sidebarItem"
            :class="{ active: selectedCategory === item }"
          >
            {{
              item === "All goods"
                ? t("shop.shop10")
                : item === "New"
                ? t("shop.shop11")
                : item === "Hot"
                ? t("shop.shop12")
                : ""
            }}
          </div>
        </div>
        <div class="SidebarContent">
          <!-- <div v-if="selectedCategory === 'All goods'">All goods 内容</div> -->
          <div class="new">
            <div class="newList" v-if="newProduct">
              <div
                class="newsItem"
                v-for="item in newProduct"
                :key="item"
                @click="
                  router.push({
                    path: '/newDetail',
                    query: { id: item.goodsId, search: selectedCategory },
                  })
                "
              >
                <img class="newsImg" :src="item.image" alt="" />
                <!-- <img
                  class="newsImg"
                  src="@/assets/images/shop/img8.png"
                  alt=""
                /> -->

                <!-- <div
                  class="newsImg"
                  :style="{
                    backgroundImage: `url(${item.cover}) `,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }"
                ></div> -->
                <div class="newsTitle">{{ item.name }}</div>
                <div class="Preview">
                  <div class="Price">${{ item.price }}</div>
                  <div class="Sold">{{ t("sold") }} {{ item.sold }}</div>
                </div>
              </div>
            </div>
            <div
              class="NoData"
              style="
                font-size: 30px;
                text-align: center;
                color: #e621ca;
                margin-top: 60px;
              "
              v-else
            >
              {{ t("noData") }}
            </div>
          </div>
          <!-- <div v-if="selectedCategory === 'Hot'">Hot 内容</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { displayDetailsGoods } from "@/api/shop";
import router from "@/router";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const loading = ref(false);
// 定义分类列表
const categories = ref(["All goods", "New", "Hot"]);

// 选中的分类，默认选中 "All goods"
const selectedCategory = ref("New");
// all goods 点击的时候 search 是空，new点击的时候 search 是空，  hot 点击的时候 search 是 hot，
const newProduct = ref();
const getNewProductData = async (search: string) => {
  loading.value = true;

  try {
    const res = await displayDetailsGoods({ search });
    if (res.data.code === 0) {
      newProduct.value = res.data.json.displayDetailsGoodsList;
    } else {
      ElNotification({
        showClose: false,
        customClass: "message-logout",
        title:
          locale.value === "zh"
            ? res.data.json.message_zh
            : res.data.json.message,
        duration: 2000,
      });
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: t("ElNoti.el35"),
      duration: 2000,
    });
  }
};
const ClickCategory = (item: string) => {
  selectedCategory.value = item;
  if (item === "New") {
    getNewProductData("");
  }
  if (item === "All goods") {
    getNewProductData("");
  }
  if (item === "Hot") {
    getNewProductData("hot");
  }
};
onMounted(() => {
  getNewProductData("");
});
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  flex: 1;
  // height: 100%;

  .container {
    padding: 30px 80px 10px 80px;
  }
}
.back {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-family: Rubik;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  margin-bottom: 16px;
}
.container_head {
  width: max-content;
  position: relative;
  color: #efcff6;
  text-align: right;
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 16px;
  img {
    width: 42px;
    height: auto;
    position: absolute;
    right: -20px;
    bottom: 4.5px;
    z-index: 2;
  }
}
.Sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  .SidebarSidebar {
    display: flex;
    gap: 24px;

    .sidebarItem {
      text-wrap: nowrap;
      color: #fff;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 125% */
      cursor: pointer;
      text-align: center;
      &:last-child {
        border-bottom: 1px solid #212121;
      }
    }
    .active {
      color: #e621ca;
    }
  }
}
.SidebarContent {
  flex: 1;
}
.new {
  width: 100%;
  .NewTitle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .title {
      color: #fff;
      text-align: center;
      font-family: Rubik;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 125% */
    }
  }
  .newList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 24px 13.6px;
    .newsItem {
      width: 202px;
      .newsImg {
        display: flex;
        width: 202px;
        height: 202px;
        border-radius: 8px;
        margin-bottom: 12px;
        cursor: pointer;
      }
    }
    .newsTitle {
      color: #fff;
      // text-align: center;
      font-family: Rubik;
      font-size: 14px;
      font-style: normal;
      font-weight: 700;
      line-height: 20px; /* 114.286% */
      margin-bottom: 8px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 限制最多两行 */
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }
    .Preview {
      display: flex;
      align-items: center;
      // max-width: 166px;
      justify-content: space-between;
      .Price {
        color: #e621ca;
        font-family: Rubik;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 15px; /* 107.143% */
      }
      .Sold {
        color: rgba(255, 255, 255, 0.5);
        font-family: Rubik;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 14px; /* 116.667% */
      }
    }
  }
}
@media (max-width: 824px) {
  .home_view {
    .container {
      padding: 20px !important;
      .Sidebar {
        gap: 15px;
        .SidebarSidebar {
          width: 50px;
          .sidebarItem {
            font-size: 14px;
          }
        }
        .SidebarContent {
          box-sizing: border-box;
          .new {
            .NewTitle {
              .title {
                font-size: 14px;
              }
            }
            .newList {
              justify-content: space-between;
              .newsItem {
                width: 160px !important;
                box-sizing: border-box;
                gap: 0 !important;
                .newsImg {
                  width: 160px !important;
                  height: 160px !important;
                }
              }
              .newsTitle {
                -webkit-line-clamp: 1 !important;
              }
            }
          }
        }
      }
    }
  }
}

:deep(.el-loading-mask) {
  background: #000000c7;
}
:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
