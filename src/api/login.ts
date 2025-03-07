import request from '@/utils/request'

// /user/addressLogin
export const addressLogin = (data: any) => {
  return request({
    url: '/user/addressLogin',
    method: 'post',
    data
  })
}
