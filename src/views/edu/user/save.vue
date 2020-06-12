<template>
  <div class="app-container">
    用户新增
     <el-form label-width="120px">
      <el-form-item label="用户登录名">
        <el-input v-model="user.username"/>
      </el-form-item>
       <el-form-item label="用户昵称">
         <el-input v-model="user.nickName"/>
       </el-form-item>
      <el-form-item label="用户类型">
        <el-select v-model="user.type" clearable placeholder="请选择">
          <el-option :value="1" label="老师"/>
          <el-option :value="2" label="学生"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
import userApi from '@/api/edu/user'
export default {
  data() {
    return {
      user:{
        username: '',
        nickName: 0,
        level: 1
      },
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getUserInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.user = {}
      }
    },
    //根据id查询的方法
    getUserInfo(id) {
      userApi.getUserInfo(id)
        .then(response => {
          this.user = response.data.user
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if(!this.user.id) {
        //添加
        this.saveUser()
      } else {
        //修改
        this.updateUser()
      }
    },
    //修改用户的方法
    updateUser() {
      userApi.updateUser(this.user)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/user/table'})
        })
    },
    //添加用户的方法
    saveUser() {
      userApi.addUser(this.user)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/user/table'})
        })
    }

  }
}
</script>
