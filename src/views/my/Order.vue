<script setup lang='ts' name="HomeView">
import { ElNotification } from "element-plus";
// 复制数据到剪贴板
const copyToClipboard = async (data: string) => {
  try {
    await navigator.clipboard.writeText(data);
    ElNotification({
      showClose: false,
      customClass: "message-logout",
      title: "Copy successfully",
      duration: 1000,
    });
  } catch (err) {
    console.error("复制失败:", err);
  }
};
</script>
<template>
  <div class="home_view">
    <div class="container">
      <div style="width: 100%">
        <div class="back" @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M13.1633 15.5867C13.3394 15.7628 13.4384 16.0017 13.4384 16.2508C13.4384 16.4999 13.3394 16.7387 13.1633 16.9148C12.9872 17.091 12.7483 17.1899 12.4992 17.1899C12.2502 17.1899 12.0113 17.091 11.8352 16.9148L5.58519 10.6648C5.49779 10.5777 5.42844 10.4743 5.38112 10.3603C5.33381 10.2463 5.30945 10.1242 5.30945 10.0008C5.30945 9.87739 5.33381 9.75522 5.38112 9.64126C5.42844 9.52731 5.49779 9.42381 5.58519 9.33672L11.8352 3.08672C12.0113 2.9106 12.2502 2.81165 12.4992 2.81165C12.7483 2.81165 12.9872 2.9106 13.1633 3.08672C13.3394 3.26284 13.4384 3.50171 13.4384 3.75078C13.4384 3.99985 13.3394 4.23872 13.1633 4.41484L7.57816 10L13.1633 15.5867Z"
              fill="white"
              fill-opacity="0.8"
              style="fill: white; fill-opacity: 0.8"
            />
          </svg>
          Back
        </div>
      </div>
      <div class="Order">Order History</div>
      <div class="father">
        <div class="DataFather" v-for="(item, index) in 2" :key="index">
          <div class="date">Jan 12,2025 / Mon</div>
          <div class="data">
            <div class="dataItem">
              <div class="title">Title of film-related activities</div>
              <div class="price">$35</div>
            </div>
            <div class="dataItem">
              <div class="title">Title of film-related activities</div>
              <div class="price">$35</div>
            </div>
            <div class="dataItem">
              <div class="title">
                Movie Gift
                <span
                  class="Delivery"
                  @click="copyToClipboard('SF1237fhq9qhfi199091h')"
                  >Delivery: SF1237fhq9qhfi199091h
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M15.1875 1.96875H6.1875C5.96372 1.96875 5.74911 2.05764 5.59088 2.21588C5.43264 2.37411 5.34375 2.58872 5.34375 2.8125V5.34375H2.8125C2.58872 5.34375 2.37411 5.43264 2.21588 5.59088C2.05764 5.74911 1.96875 5.96372 1.96875 6.1875V15.1875C1.96875 15.4113 2.05764 15.6259 2.21588 15.7841C2.37411 15.9424 2.58872 16.0312 2.8125 16.0312H11.8125C12.0363 16.0312 12.2509 15.9424 12.4091 15.7841C12.5674 15.6259 12.6562 15.4113 12.6562 15.1875V12.6562H15.1875C15.4113 12.6562 15.6259 12.5674 15.7841 12.4091C15.9424 12.2509 16.0312 12.0363 16.0312 11.8125V2.8125C16.0312 2.58872 15.9424 2.37411 15.7841 2.21588C15.6259 2.05764 15.4113 1.96875 15.1875 1.96875ZM10.9688 14.3438H3.65625V7.03125H10.9688V14.3438ZM14.3438 10.9688H12.6562V6.1875C12.6562 5.96372 12.5674 5.74911 12.4091 5.59088C12.2509 5.43264 12.0363 5.34375 11.8125 5.34375H7.03125V3.65625H14.3438V10.9688Z"
                      fill="#D3D3D3"
                      style="
                        fill: #d3d3d3;
                        fill: color(display-p3 0.8272 0.8272 0.8272);
                        fill-opacity: 1;
                      "
                    />
                  </svg>
                </span>
              </div>
              <div class="price">$35</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang='less'>
.home_view {
  background: rgb(0, 0, 0);
  width: 100%;
  min-height: 960px;
  .container {
    padding-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;

    width: 350px;
    gap: 24px;
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
}
.father {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.Order {
  color: #fff;
  font-family: Rubik;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.4px;
  padding-bottom: 16px;
  border-bottom: 1px solid #2a2a2a;
}
.DataFather {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .date {
    color: rgba(255, 255, 255, 0.6);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 14px; /* 100% */
  }
  .data {
    display: flex;
    flex-direction: column;
    gap: 16px;
    .dataItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        display: flex;
        flex-direction: column;
        gap: 4px;
        color: #fff;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        .Delivery {
          color: #d3d3d3;
          font-family: Inter;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          cursor: pointer;
        }
      }
      .price {
        color: #fff;
        font-family: Rubik;
        font-size: 20px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        letter-spacing: 0.8px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
<style>
.message-logout {
  top: 104px !important;
  right: 24px !important;
  background: #000;
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
  border-radius: 11px;
  border: 1px solid rgba(107, 107, 107, 0.4);
  background: rgb(26, 26, 26);
  width: 328px;
  display: flex;
  flex-direction: column;
  gap: 11px;
}
.el-notification__title {
  color: #fff;
  font-family: Rubik;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.56px;
}
</style>