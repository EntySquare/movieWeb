import request from "@/utils/request";

// 获取图片
export const getImage = (data: any) => {
  return request({
    url: "/admin/vote/getImage",
    method: "post",
    data,
  });
};
