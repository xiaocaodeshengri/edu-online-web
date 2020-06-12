<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类 TODO -->
        <el-form-item label="课程分类">
            <el-select
                v-model="courseInfo.subjectParentId"
                placeholder="分类">

                <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"/>

            </el-select>
        </el-form-item>

        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">

            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value" />

        </el-select>
        </el-form-item>

        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <!-- 课程简介-->
      <el-form-item label="课程简介">
        <el-input type="textarea" placeholder="请输入内容"  v-model="textarea" maxlength="30" show-word-limit>
        </el-input>
      </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
export default {
    //声明组件
    data() {
        return {
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '',//二级分类id
                subjectParentId:'',//一级分类id
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/01.jpg',
                price: 0
            },
            courseId:'',
            BASE_API: process.env.BASE_API, // 接口API地址
            subjectOneList:[{
              id: '1178214681118568449',
              title: 'Java架构师'
            }],
          options: [{
            value: '1189389726308478977',
            label: '张三丰'
          }],
        }
    },
    created() {
        //获取路由id值
        if(this.$route.params && this.$route.params.id) {
            this.courseId = this.$route.params.id
            //调用根据id查询课程的方法
            this.getInfo()
        }
    },
    methods:{
        //根据课程id查询
        getInfo() {
            course.getCourseInfoId(this.courseId)
                .then(response => {
                    //在courseInfo课程基本信息，包含 一级分类id 和 二级分类id
                    this.courseInfo = response.data.courseInfoVo
                    if(this.courseId){
                      this.courseInfo.subjectParentId ='1178214681118568449';
                      this.courseInfo.teacherId = '1189389726308478977';
                    }
                })
        },

        //添加课程
        addCourse() {
            course.addCourseInfo(this.courseInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/course/chapter/'+response.data.courseId})
                })
        },
        //修改课程
        updateCourse() {
            course.updateCourseInfo(this.courseInfo)
                .then(response => {
                     //提示
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/course/chapter/'+this.courseId})
                })
        },
        saveOrUpdate() {
           //判断添加还是修改
           if(!this.courseInfo.id) {
               //添加
               this.addCourse()
           } else {
               this.updateCourse()
           }
        }
    }
}
</script>

