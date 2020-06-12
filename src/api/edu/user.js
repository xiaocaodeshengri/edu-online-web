import request from '@/utils/request'
export default {
  //获取用户列表
    getUserList(current,limit,userQuery) {
        return request({
            url: `/admin/acl/user/pageUser/${current}/${limit}`,
            method: 'post',
            data: userQuery
          })
    },

    deleteUserId(id) {
        return request({
            url: `/admin/acl/user/${id}`,
            method: 'delete'
          })
    },
    addUser(user) {
        return request({
            url: `/admin/acl/user/addUser`,
            method: 'post',
            data: user
          })
    },
    getUserInfo(id) {
        return request({
            url: `/admin/acl/user/getUser/${id}`,
            method: 'get'
          })
    },
    //修改用户
    updateUser(user) {
        return request({
            url: `/admin/acl/user/updateUser`,
            method: 'post',
            data: user
          })
    }
}
