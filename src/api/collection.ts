import request from '@/utils/request'
import requestLong from '@/utils/requestLong'

// /movieapp//showCollections
export const showCollections = () => {
    return request({
        url: '/nft/showCollections',
        method: 'post',

    })
}
