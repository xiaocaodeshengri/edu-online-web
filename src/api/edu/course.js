import request from '@/utils/request'
export default {
    //1 添加课程信息
    addCourseInfo(courseInfo) {
        return request({
            url: '/admin/acl/course/addCourseInfo',
            method: 'post',
            data:courseInfo
          })
    },

    //根据课程id查询课程基本信息
    getCourseInfoId(courseId) {
        return request({
            url: '/admin/acl/course/getCourseInfo/'+courseId,
            method: 'get'
          })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/admin/acl/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    //课程确认信息显示
    getPublihCourseInfo(id) {
        return request({
            url: '/admin/acl/course/getPublishCourseInfo/'+id,
            method: 'get'
          })
    },
    //课程最终发布
    publihCourse(id) {
        return request({
            url: '/admin/acl/course/publishCourse/'+id,
            method: 'post'
          })
    },

    //课程最终发布
    getListCourse(current,limit,query) {
        return request({
            url: `/admin/acl/course/pageCourse/${current}/${limit}`,
           method: 'post',
           data: query
          })
    },
  deleteCourseById(courseId){
    return request({
      url: `/admin/acl/course/deleteCourseById/${courseId}`,
      method: 'delete',
    })
  }


}
