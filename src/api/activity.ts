import request from '@/utils/request'

// /activity/showAllHotMovie 展示热门电影
export const showAllHotMovie = () => {
    return request({
        url: '/movieapp/activity/showAllHotMovie',
        method: 'post',

    })
}
// /activity/showAllHotEvent 展示热门活动
export const showAllHotEvent = () => {
    return request({
        url: '/movieapp/activity/showAllHotEvent',
        method: 'post',

    })
}