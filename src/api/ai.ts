import request from '@/utils/request'
import requestLong from '@/utils/requestLong'

// /movieapp/vote/displayWahlPool
export const displayWahlPool = () => {
    return request({
        url: '/vote/displayWahlPool',
        method: 'post',

    })
}

// /vote/voteWahlPool 投票的后端接口
export const voteWahlPool = (data: any) => {
    return requestLong({
        url: '/vote/voteWahlPool',
        method: 'post',
        data: data
    })
}