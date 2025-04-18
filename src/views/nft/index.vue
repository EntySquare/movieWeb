<template>
  <div class="home_view">
    <div class="container" v-loading="loading">
      <div class="Sidebar">
        <div class="SidebarContent">
          <div class="new" v-if="list.length > 0">
            <div class="newList" v-if="list">
              <div
                class="newsItem"
                v-for="(item, index) in list"
                :key="index"
                @click="
                  router.push({
                    path: '/nft/detail',
                    query: { id: item.tokenId },
                  })
                "
              >
                <div class="nftBg">
                  <div
                    class="newsImg"
                    :style="{
                      backgroundImage: `url(${item.cover}) `,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }"
                  ></div>
                </div>
                <div class="newsTitle">{{ item.name }}</div>
                <div class="Preview">
                  <div class="Price">${{ item.price }}</div>
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
          <div
            class="NoData"
            style="
              font-size: 20px;
              text-align: center;
              color: #e621ca;
              margin-top: 60px;
            "
            v-else
          >
            {{ t("noData") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { displayNFTForSale } from "@/api/nft";
import router from "@/router";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const loading = ref(false);

// 类型
interface NFT {
  cover: string;
  describe: string;
  image: string;
  name: string;
  price: string;
  status: string;
  title: string;
  tokenId: string;
}
// 选中的分类，默认选中 "All goods"
// all goods 点击的时候 search 是空，new点击的时候 search 是空，  hot 点击的时候 search 是 hot，
const list = ref<NFT[]>([]);
const getList = async () => {
  loading.value = true;

  try {
    const res = await displayNFTForSale();
    if (res.data.code === 0) {
      list.value = res.data.json;
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

onMounted(() => {
  getList();
});
</script>

<style scoped lang="less">
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  height: 100vh;

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
      .nftBg {
        width: 234px;
        height: 234px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
        //   background: url("@/assets/images/nftBg.png") no-repeat center;
        //   background-size: cover;
        //   border-radius: 8px;
        //   width: 284px;
        //   height: 284px;
        //   display: flex;
        //   align-items: end;
        //   justify-content: center;
        //   margin-bottom: 20px;
        background: #121212;
      }
      .newsImg {
        display: flex;
        width: 234px;
        height: 234px;
        border-radius: 8px;
        cursor: pointer;
        margin-bottom: 20px;
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
                display: flex;
                flex-direction: column;
                align-items: center;
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

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
