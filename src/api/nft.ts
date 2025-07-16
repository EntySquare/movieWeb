import request from '@/utils/request'
import requestLong from '@/utils/requestLong'

// /nft/displayNFTForSale
export const displayNFTForSale = () => {
    return request({
        url: '/movieapp/nft/displayNFTForSale',
        method: 'post',
    })
}

// /nft/buyUserMint 授权购买NFT
export const buyUserMint = (data: any) => {
    return requestLong({
        url: '/movieapp/nft/buyUserMint',
        method: 'post',
        data
    })
}

