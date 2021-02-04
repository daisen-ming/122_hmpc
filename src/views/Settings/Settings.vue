<template>
  <div class="setting-container">
    <el-card>
      <!-- 导航 -->
      <div slot="header">
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form :model="user" :rules="r" label-width="120px">
            <el-form-item label="编号：">{{user.id}}</el-form-item>
            <el-form-item label="手机：">{{user.mobile}}</el-form-item>
            <el-form-item label="用户名称：" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="用户简介：">
              <el-input
                type="textarea"
                :rows="3"
                v-model="user.intro"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="saveFn" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request='customUploadFn'
          >
            <img v-if="user.photo" :src="user.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { userInfoAPI, updateInfoAPI, upAvatarAPI } from '@/api'
import { updateUserRules } from '@/verify'
export default {
  name: 'settings',
  data () {
    return {
      user: {},
      r: updateUserRules
    }
  },

  async created () {
    const res = await userInfoAPI()
    this.user = res.data.data
  },
  methods: {
    async saveFn () {
      await updateInfoAPI(this.user)
      this.$EventBus.$emit('nameBus', this.user.name)
      this.$message({
        message: '成功了',
        type: 'success'
      })
    },
    async customUploadFn (fileObj) {
      const fd = new FormData()
      fd.append('photo', fileObj.file)
      const res = await upAvatarAPI(fd)
      this.user.photo = res.data.data.photo
      this.$EventBus.$emit('photourl', this.user.photo)
    }
  }
}
</script>

<style scoped lang='less'>
.avatar {
  width: 178px;
  height: 178px;
  line-height: 178px;
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
.edit-photo {
  font-size: 12px;
  text-align: center;
}
</style>
