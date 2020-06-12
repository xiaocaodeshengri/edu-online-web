import request from '@/utils/request'
export default {
    //1 根据课程id获取章节
    getAllChapter(courseId) {
        return request({
            url: '/admin/acl/course/getChapter/'+courseId,
            method: 'get'
          })
    },
    //添加章节
    addChapter(chapter) {
        return request({
            url: '/admin/acl/course/addChapter',
            method: 'post',
            data: chapter
          })
    },
    //根据id查询章节
    getChapter(chapterId) {
        return request({
            url: '/admin/acl/course/getChapterInfo/'+chapterId,
            method: 'get'
          })
    },
    //修改章节
    updateChapter(chapter) {
        return request({
            url: '/admin/acl/course/updateChapter',
            method: 'post',
            data: chapter
          })
    },
    //删除章节
    deleteChapter(chapterId) {
        return request({
            url: '/admin/acl/course/delete/'+chapterId,
            method: 'delete'
          })
    },
}
