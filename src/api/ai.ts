import request from '@/utils/request'
import requestLong from '@/utils/requestLong'

// /movieapp/vote/displayWahlPool
export const displayWahlPool = () => {
    return request({
        url: '/movieapp/vote/displayWahlPool',
        method: 'post',

    })
}

// /vote/voteWahlPool 投票的后端接口
export const voteWahlPool = (data: any) => {
    return requestLong({
        url: '/movieapp/vote/voteWahlPool',
        method: 'post',
        data: data
    })
}


// /vote/distributeBonus  领取奖励

export const distributeBonus = (data: any) => {
    return requestLong({
        url: '/movieapp/vote/distributeBonus',
        method: 'post',
        data: data
    })
}

// /vote/judgeBonus 判断是否领取 

export const judgeBonus = (data: any) => {
    return request({
        url: '/movieapp/vote/judgeBonus',
        method: 'post',
        data: data
    })
}

// /vote/getInviterInfo 获取邀请者信息 这个就是先去看看 获得转发链接的用户，在后台看看返回他这个上一级和上上级推荐人是谁
export const getInviterInfo = (data: any) => {
    return request({
        url: '/movieapp/vote/getInviterInfo',
        method: 'post',
        data: data
    })
}

// /vote/inviterVote 然后是这个，就是邀请人获得额外投票

export const inviterVote = (data: any) => {
    return request({
        url: '/movieapp/vote/inviterVote',
        method: 'post',
        data: data
    })
}