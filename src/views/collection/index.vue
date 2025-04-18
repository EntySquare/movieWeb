<template>
  <div class="collection-page">
    <div class="container" v-loading="loading">
      <el-row :gutter="20">
        <el-col :span="8" v-for="item in List" :key="item.id">
          <el-card shadow="hover" class="card"
            ><img style="cardImg" :src="item.image" alt="" />
            {{ item.name }}
            {{ item.amount }}
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showCollections } from "@/api/collection";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";

interface Item {
  id: number;
  title: string;
  description: string;
  image: string;
  collected: boolean;
}
import { useI18n } from "vue-i18n";
const { t , locale } = useI18n();
const List = ref();
const loading = ref(false); // 控制按钮 loading 状态

const getList = async () => {
  loading.value = true;
  try {
    const res = await showCollections();
    if (res.data.code === 0) {
      List.value = res.data.json;
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

<style scoped>
.collection-page {
  padding: 20px;
}

.card {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  background: #000;
  width: 304px;
  height: 304px;
}
.cardImg {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  width: 204px;
  height: 204px;
  padding: 12px 133px 150px 9px;
  align-items: center;
  border-radius: 8px;
  background: #121212;
}

.card-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 10px;
}

.card-content {
  padding-top: 10px;
}

.desc {
  color: #888;
  font-size: 14px;
  margin: 5px 0 15px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.el-loading-mask) {
  background-color: rgba(0, 0, 0, 0.7);
}

:deep(.el-loading-spinner .path) {
  stroke: #e621ca;
}
</style>
