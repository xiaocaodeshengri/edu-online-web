<template>
  <div class="app-container">
    用户列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="userQuery.username" placeholder="用户名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="userQuery.type" clearable placeholder="用户类型">
          <el-option :value="1" label="老师"/>
          <el-option :value="2" label="学生"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名"  />

      <el-table-column prop="nick_name" label="用户昵称" />

      <el-table-column label="用户类型" >
        scope.row.type
        <template slot-scope="scope">
            {{ scope.row.type===1?'老师':'学生' }}
        </template>
      </el-table-column>

      <el-table-column prop="gmt_create" label="添加时间" />
      <el-table-column prop="gmt_modified" label="修改时间" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/user/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
import user from '@/api/edu/user'
export default {
  data() {
    return {
      list:null,
      page:1,
      limit:10,
      total:0,
      userQuery:{}
        }
    },
    created() {
        this.getList()
    },
    methods:{
        getList(page=1) {
            this.page = page
          user.getUserList(this.page,this.limit,this.userQuery)
                .then(response =>{
                    this.list = response.data.rows
                    this.total = response.data.total
                    console.log(this.list)
                    console.log(this.total)
                })
        },
        resetData() {
            this.userQuery = {}
            this.getList()
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
              user.deleteUserId(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        }

    }
}
</script>
