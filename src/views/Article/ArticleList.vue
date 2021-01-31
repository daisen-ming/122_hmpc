<template>
  <div class="article-container">
    <!-- 卡片布局 -->
    <el-card class="box-card">
      <!-- 头部- div作为header的具名插槽插入el-card组件内-顶部一条 -->
      <div slot="header" class="clearfix">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 卡片布局-内容 -->
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 第一行 -->
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 第二行 -->
        <el-form-item label="频道" >
            <el-select v-model="form.channel_id" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
            v-for="obj in channelList"
            :key="obj.id"
            :value="obj.id"
            :label="obj.name"
             ></el-option>
          </el-select>
        </el-form-item>
        <!-- 第三行 -->
        <el-form-item label="日期" >
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.begin_pubdate"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              placeholder="结束时间"
              style="width: 100%"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.end_pubdate"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<!-- 下部--卡片布局 -->
<el-card style="margin-top:20px;">
    <!-- 卡片头部导航 -->

     <div slot="header" class="clearfix">根据筛选条件查询到XXXX条数据：</div>
<!-- 头部正文 -->
<el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="cover"
      label="封面"
      width="180">
          <template slot-scope="scope">
           <!-- 图片默认用第0个(lazy懒加载-滑动到那里再加载) -->
           <el-image
             :src="scope.row.cover.images[0]"
             style="width: 150px; height: 100px"
             lazy>

             <div slot="placeholder" class="image-slot">
               加载中<span class="dot">...</span>
             </div>
           </el-image>
         </template>
  </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="180">
      <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">草稿</el-tag>
          <el-tag v-else-if="scope.row.status === 1" type="info"
           >待审核</el-tag
         >
          <el-tag v-else-if="scope.row.status === 2" type="success"
           >审核通过</el-tag
         >
         <el-tag v-else-if="scope.row.status === 3" type="warning"
           >审核失败</el-tag
         >
          <el-tag v-else-if="scope.row.status === 4" type="danger"
            >已删除</el-tag
          >
        </template>
    </el-table-column>
    <el-table-column
      prop="pubdate"
      label="时间">
    </el-table-column>
    <el-table-column
      prop=""
      label="操作">
       <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            circle
            @click="hEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
            @click="hDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
    </el-table-column>
  </el-table>
<el-pagination
   style="margin-top:10px;"
   background
   layout="prev, pager, next"
   @current-change="changePage"
   :total="total">
      </el-pagination>

</el-card>

  </div>
</template>

<script>
import { channelListAPI, articleListAPI } from '@/api'
export default {
  name: 'articlelist',
  data () {
    return {
      form: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelList: [],
      tableData: [],
      total: 0,
      reqParams: {
        page: 1,
        per_page: 10
      }

    }
  },
  methods: {
    hEdit (index, obj) {},
    hDelete (index, obj) {},
    changePage (page) {
      this.reqParams.page = page
      this.getArticleListFn()
    },
    async getArticleListFn () {
      const articleRes = await articleListAPI(Object.assign({}, this.form, this.reqParams))
      this.tableData = articleRes.data.data.results
      this.total = articleRes.data.data.total_count
    }
  },
  async created () {
    const res = await channelListAPI()
    this.channelList = res.data.data.channels
    // const articleRes = await articleListAPI()
    // this.tableData = articleRes.data.data.results
    this.getArticleListFn()
  }
}
</script>

<style lang="less" scoped>

</style>
