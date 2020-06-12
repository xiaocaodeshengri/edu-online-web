<template>
  <div class="app-container">未选课程列表



    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      :row-class-name="tableRowClassName">


      <el-table-column prop="title" label="课程名称" />

      <el-table-column label="课程状态" >
        <template slot-scope="scope">
          {{ scope.row.status==='Normal'?'已发布':'未发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" />

      <el-table-column prop="gmtCreate" label="添加时间" />
      <el-table-column prop="price" label="学费"  />
      <el-table-column prop="buyCount" label="订阅数量"  />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="addSub(scope.row.id)">订阅</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  import sub from '@/api/edu/sub'
  export default {
    data() {
      return {
        list:null,
        subQuery:{}
      }
    },
    created() {
      this.getList()
    },
    methods:{
      getList() {
        sub.getNotSubList(this.subQuery)
          .then(response =>{
            this.list = response.data.rows
          })
      },
      resetData() {
        this.subQuery = {}
        this.getList()
      },
      addSub(id) {
        this.$confirm('确定要订阅此课程?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {  //点击确定，执行then方法
          //调用删除的方法
          sub.addSub(id)
            .then(response =>{//删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '订阅成功!'
              });
              //回到列表页面
              this.getList()
            })
        }) //点击取消，执行catch方法
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
        return '';
      },

    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
