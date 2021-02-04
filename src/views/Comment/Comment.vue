<template>
  <div class="article-container">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 主体表格 -->
      <el-table  style="width: 100%" :data="tableData">
        <el-table-column prop="title" label="文章标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数"> </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数"> </el-table-column>

        <!-- 由于后端回传的数据是数值，而我们要显示出来是对应字符串，
        所以，这里不能直接使用status -->
        <el-table-column prop="comment_status" label="评论状态" >
           <template v-slot="scope">
            <el-tag :type="scope.row.comment_status ? 'primary' : 'danger'">{{ scope.row.comment_status ? '正常' : '关闭' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="danger"
              v-if="scope.row.comment_status"
              @click="openOrClose(scope.row,false)"
              >关闭评论</el-button
            >
            <el-button
              size="mini"
              type="primary"
              v-if="!scope.row.comment_status"
              @click="openOrClose(scope.row , true)"
              >打开评论</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件
        它只是根据total和page-size来显示页码，而与具体的表格数据无关

        1. total是总条数数；
        默认情况，它会以每页10条进行计算总页数
        2. current-change。当点击页码时，它会触发,会传入当前的页码。
      -->
      <el-pagination
        style="margin-top: 10px"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="reqParams.page"
        @current-change="pageChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { commentListAPI, openOrCloseCommentAPI } from '@/api'
export default {
  name: 'comment',
  data () {
    return {
      tableData: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 10

      }
    }
  },
  methods: {
    async getCommentFn () {
      const res = await commentListAPI(this.reqParams)
      this.tableData = res.data.data.results
      this.total = res.data.data.total_count
    },
    pageChange (page) {
      this.reqParams.page = page
      this.getCommentFn()
    },
    async openOrClose (obj, bool) {
      await openOrCloseCommentAPI({ article_id: obj.id.toString() }, { allow_comment: bool })
      this.getCommentFn()
    }
  },
  created () {
    this.getCommentFn()
  }
}

</script>

<style scoped lang='less'></style>
