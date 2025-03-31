<template>
  <div class="home_view">
    <div class="container">
      <div class="Sidebar">
        <div class="SidebarSidebar">
          <div
            v-for="(item, index) in categories"
            :key="index"
            @click="ClickCategory(item)"
            class="sidebarItem"
            :class="{ active: selectedCategory === item }"
          >
            {{ item }}
          </div>
        </div>
        <div class="SidebarContent">
          <!-- <div v-if="selectedCategory === 'All goods'">All goods 内容</div> -->
          <div class="new">
            <div class="NewTitle">
              <div class="title">{{ selectedCategory }}</div>
            </div>
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
                <!-- <img class="newsImg" :src="item.image" alt="" />
                    -->
                <div
                  class="newsImg"
                  :style="{
                    backgroundImage: `url(${item.cover}) `,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                  }"
                ></div>
                <div class="newsTitle">{{ item.name }}</div>
                <div class="Preview">
                  <div class="Price">${{ item.price }}</div>
                  <div class="Sold">Sold {{ item.sold }}</div>
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
              No data for now
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
import { onMounted, ref } from "vue";

// 定义分类列表
const categories = ref(["All goods", "New", "Hot"]);

// 选中的分类，默认选中 "All goods"
const selectedCategory = ref("Hot");
// all goods 点击的时候 search 是空，new点击的时候 search 是空，  hot 点击的时候 search 是 hot，
const newProduct = ref();
const getNewProductData = async (search: string) => {
  const res = await displayDetailsGoods({ search });
  console.log("getNewProductData", res.data.json);
  if (res.data.code === 0) {
    newProduct.value = res.data.json.displayDetailsGoodsList;
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
  getNewProductData("hot");
});
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  // height: 100%;

  .container {
    padding: 43px 120px 153px 120px;
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
  margin-bottom: 20px;
}
.Sidebar {
  display: flex;
  gap: 52px;
  .SidebarSidebar {
    width: 74px;
    display: flex;
    flex-direction: column;

    .sidebarItem {
      padding: 8px 0;
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
  padding-top: 8px;
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
    gap: 28px;
    row-gap: 26px;
    .newsItem {
      width: 274px;
      .newsImg {
        display: flex;
        width: 274px;
        height: 274px;
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
      padding: 15px !important;
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
              .newsItem {
                width: 100%;
                padding: 6px;
                border-radius: 6px;
                box-sizing: border-box;
                background-color: rgba(18, 18, 18, 1);
                .newsImg {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
