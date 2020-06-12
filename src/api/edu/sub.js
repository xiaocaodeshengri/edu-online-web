import request from '@/utils/request'
export default {
  //获取订阅列表
  getSubList(current,limit,subQuery) {
        return request({
            url: `/admin/acl/sub/pageSub/${current}/${limit}`,
            method: 'post',
            data: subQuery
          })
    },
  //获取未订阅列表
  getNotSubList(subQuery) {
    return request({
      url: `/admin/acl/sub/pageNotSub`,
      method: 'post',
      data: subQuery
    })
  },

  addSub(id) {
        return request({
            url: `/admin/acl/sub/addSub/${id}`,
            method: 'get'
          })
    },

  deleteSubId(id){
    return request({
      url: `/admin/acl/sub/${id}`,
      method: 'delete'
    })
  }

}
