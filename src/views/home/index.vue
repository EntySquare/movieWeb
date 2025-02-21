<script setup lang='ts' name="HomeView">
import { useWindowSize } from "@/utils/useWindowSize";

const { windowWidth } = useWindowSize();
</script>
<template>
  <div class="home_view">
    <OpenScreen v-if="windowWidth > 824" />
    <OpenScreenPhone v-else />
  </div>
</template>
<style scoped lang='less'>
.home_view {
  // background: rgb(0, 0, 0);
  height: 100%;
  overflow: hidden;
  .container {
    padding: 60px 0 40px 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
@media (max-width: 824px) {
  .home_view {
    overflow: auto;
  }
}
</style>