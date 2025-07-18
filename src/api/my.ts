import request from '@/utils/request'

// /order/showAllMyActivity
export const showAllMyActivity = () => {
    return request({
        url: '/movieapp/order/showAllMyActivity',
        method: 'post',

    })
}

// /order/showAllMyTicket
export const showAllMyTicket = () => {
    return request({
        url: '/movieapp/order/showAllMyTicket',
        method: 'post',

    })
}
// /shop/purchaseAddAddress 订单添加收货地址
// 入参：hash 哈希，address 收货地址
export const purchaseAddAddress = (data: any) => {
    return request({
        url: '/movieapp/shop/purchaseAddAddress',
        method: 'post',
        data
    })
}