<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px">
        <el-radio-group size="mini" v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>

         <el-button
          @click="dialogVisible = true"
          type="success"
          size="mini"
          style="float: right"
          >上传图片素材
        </el-button>
      </div>
      <!-- 素材列表 -->
<el-row :gutter="10">
        <el-col class="img_item"
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        v-for="obj in listArr"
        :key="obj.id"
        >
          <el-image
            style="height: 180px; width: 100%"
            :src="obj.url"
            fit="cover"
          ></el-image>
          <div class="option">
            <span class="el-icon-star-on"
             :style="{color: obj.is_collected ? 'red' : '#fff'}"
             @click="collectedFn(obj)"
             ></span>
            <span class="el-icon-delete" @click="delFn(obj)"></span>
          </div>
        </el-col>
      </el-row>
       <!-- 分页 -->
      <el-pagination
        style="margin-top: 10px"
        background
         layout="total, sizes, prev, pager, next, jumper"
        @current-change="hPageChange"
        :current-page="reqParams.page"
        @size-change="handleSizeChange"
        :page-size="reqParams.per_page"
        :page-sizes="[8, 16, 24, 32]"
        :total="total"
      >
      </el-pagination>

      <!-- 对话框 -->
      <el-dialog
        title="提示"
        :append-to-body="true"
        :visible.sync="dialogVisible"
      >
        <!-- <span>上传图片</span> -->

<el-upload
  class="upload-demo"
  action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
  :headers="headers"
  name="image"
  :show-file-list="false"
  :before-upload="beforeAvatarUpload"
  :on-success="handleAvatarSuccess"
  >
   <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>

      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { UserImageListAPI, collectedImgAPI, delUserImgAPI } from '@/api'
export default {
  name: 'images',
  data () {
    return {
      listArr: [],
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      total: 0,
      radio1: '全部',
      dialogVisible: false, // 弹出框是否显示
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      imageUrl: ''
    }
  },
  watch: {
    radio1 (newVal) {
      this.reqParams.collect = newVal !== '全部'
      this.getImgListFn()
    }
  },
  methods: {
    beforeAvatarUpload (file) { // 文件上传之前 (先判断验证下)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2 // 1Kb = 1024byte  (1byte=8Bit(二进制))
      // 例如 file.size的值 3000000 / 1024 / 1024的值 2.8Mb
      if (!isJPG) {
        this.$message.error('图片只能是 JPG 格式 / PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2Mb!')
      }

      return isJPG && isLt2M // 如果返回true就开始上传, 如果返回false则停止上传
    },
    handleAvatarSuccess (res, file) {
      // console.log(res)
      this.imageUrl = res.data.url
      this.$message({
        message: '上传成功',
        type: 'success',
        onclose: () => {
          this.dialogVisible = false
          this.imageUrl = ''
        },
        duration: 1500
      })
      this.getImgListFn()
    },
    handleSizeChange (val) {
      this.reqParams.per_page = val
      this.getImgListFn()
    },
    async getImgListFn () {
      const res = await UserImageListAPI(this.reqParams)
      this.listArr = res.data.data.results
      this.total = res.data.data.total_count
    },
    hPageChange (page) {
      this.reqParams.page = page
      this.getImgListFn()
    },
    async collectedFn (obj) {
      this.reqParams.page = 1
      await collectedImgAPI(obj.id, { collect: !obj.is_collected })
      this.getImgListFn()
    },
    async delFn (obj) {
      await delUserImgAPI(obj.id)
      this.$message({
        message: '删除成功',
        type: 'success',
        duration: 1500
      })
    }

  },

  created () {
    this.getImgListFn()
  }
}
</script>

<style scoped lang="less">
 .img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

/* 选中样式 */
//
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
