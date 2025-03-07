import request from '@/utils/request'

// /order/showAllMyActivity
export const showAllMyActivity = () => {
    return request({
        url: '/order/showAllMyActivity',
        method: 'post',

    })
}

// /order/showAllMyTicket
export const showAllMyTicket = () => {
    return request({
        url: '/order/showAllMyTicket',
        method: 'post',

    })
}