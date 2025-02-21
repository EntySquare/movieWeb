import request from '@/utils/request'

// 注册
export const showAllHotMovie = () => {
    return request({
        url: '/activity/showAllHotMovie',
        method: 'post',

    })
}