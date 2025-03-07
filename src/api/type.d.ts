export interface OrderInfo {
  seq: number;
  hash: string;
  orderNo: string;
  activityId: number;
  activityName: string;
  imageUrl: string;
  showTime: string;
  place: string;
  price: string;
  buyTime: string;
}
export interface CartItem {
  cartId: string;      // 购物车 ID
  userId: string;      // 用户 ID
  goodsId: string;     // 商品 ID
  title: string;       // 商品标题
  describe: string;    // 商品描述
  cover: string;       // 商品封面图片 URL
  image: string;       // 商品图片 URL
  price: string;       // 价格
  number: number;      // 购买数量
}
export interface GoodsInfo {
  goodsId: string;     // 商品 ID
  cartId: string;      // 购物车 ID
  name: string;        // 商品名称
  title: string;       // 商品标题
  describe: string;    // 商品描述
  cover: string;       // 商品封面图片 URL
  image: string;       // 商品图片 URL
  price: string;       // 价格
  number: number;      // 购买数量
  sold: string;        // 已售数量
  stock: string;       // 库存数量
}
export interface CartItemAll {
  cartId: string;
  userId: string;
  goodsId: string;
  title: string;
  price: string; // 价格是字符串，但计算时要转换成 number
  number: string; // 数量是字符串，但计算时要转换成 number
  cover: string;
  image: string;
  describe: string;
}
