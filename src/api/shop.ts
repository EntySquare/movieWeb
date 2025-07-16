import request from '@/utils/request'
import requestLong from '@/utils/requestLong'

// /shop/displayDetailsGoods  展示全部商品
export const displayDetailsGoods = (data: any) => {
    return request({
        url: '/movieapp/shop/displayDetailsGoods',
        method: 'post',
        data
    })
}
// /activity/showHotEventMovieWeb
export const showHotEventMovieWeb = (data: any) => {
    return request({
        url: '/movieapp/activity/showHotEventMovieWeb',
        method: 'post',
        data
    })
}

// /order/purchaseActivity
export const purchaseActivity = (data: any) => {
    return request({
        url: '/movieapp/order/purchaseActivity',
        method: 'post',
        data
    })
}
// /shop/purchaseGoods  购买
export const purchaseGoods = (data: any) => {
    return requestLong({
        url: '/movieapp/shop/purchaseGoods',
        method: 'post',
        data
    })
}
// /shop/scanPurchaseStatus  购买
export const scanPurchaseStatus = (data: any) => {
    return requestLong({
        url: '/movieapp/shop/scanPurchaseStatus',
        method: 'post',
        data
    })
}
//   payType: number; // 1: PayPal, 2: Stripe, 3: Blockchain
//   address: string;  // Wallet address
//   hash: string;     // Blockchain transaction hash / Payment system order ID


// /shop/addGoodsCart  加购物车  goodsId，number
export const addGoodsCart = (data: any) => {
    return request({
        url: '/movieapp/shop/addGoodsCart',
        method: 'post',
        data
    })
}
// /shop/modifyGoodsCart 这个接口本来是修改购物车商品数量
export const modifyGoodsCart = (data: any) => {
    return request({
        url: '/movieapp/shop/modifyGoodsCart',
        method: 'post',
        data
    })
}
// /shop/deleteGoodsCart  删除购物车商品
export const deleteGoodsCart = (data: any) => {
    return request({
        url: '/movieapp/shop/deleteGoodsCart',
        method: 'post',
        data
    })
}
// /shop/displayGoodsCart  展示购物车
export const displayGoodsCart = () => {
    return request({
        url: '/movieapp/shop/displayGoodsCart',
        method: 'post',

    })
}

