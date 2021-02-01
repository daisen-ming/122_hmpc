<template>
  <div class="publish-container">
    <!-- 卡片模式 -->
    <el-card>
      <!-- 卡片上部 -->
      <div slot="header">
        <!-- 面包屑导航 -->
        <el-breadcrumb>
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 发布文章_表单 -->
      <el-form ref="form" :model="article" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
       <quill-editor
        :options='editorOption'
        v-model="article.content"
        >
       </quill-editor>
       </el-form-item>
        <el-form-item label="封面">
          <el-radio-group
          v-model="article.cover.type"
          @change="typeChange"
          >
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三张</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
<!-- 封面图片组件 -->
          <el-form-item>
              <el-row :gutter="20">
                <el-col :span="5">
                  <my-cover></my-cover>
                </el-col>
              </el-row>
          </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
            v-for="obj in channelArr"
            :key="obj.id"
            :label="obj.name"
             :value="obj.id"
             ></el-option>

          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="createFn(false)">发表</el-button>
          <el-button @click="createFn(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { channelListAPI, articleAddAPI, articleByIdAPI, articleUpdateAPI } from '@/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 规则
import { articleAddRules } from '@/verify'
// 引入封面组件mycover
import MyCover from '@/components/MyCover'

export default {
  name: 'articleadd',
  data () {
    return {
      article: {
        title: '',
        content: '',
        resource: '',
        cover: {
          type: '',
          images: []
        },
        channel_id: ''
      },
      channelArr: [],
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // 加粗, 斜体, 下划线, 删除线
            ['blockquote', 'code-block'], // 双引号和代码
            [{ header: 1 }, { header: 2 }], // h几字体图标
            [{ list: 'ordered' }, { list: 'bullet' }], // 有序列表, 无序列表
            [{ indent: '-1' }, { indent: '+1' }], // 缩进-1, 缩进+1 按钮
            ['image'] // 图片插件
          ]
        }
      },
      rules: articleAddRules,
      artId: -1
    }
  },
  methods: {
    createFn (bool) {
      this.$refs.form.validate(async valid => {
        if (valid === false) return

        if (this.artId !== -1) {
          await articleUpdateAPI(this.artId, { draft: bool }, this.article)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.replace('/layout/articleList')
        } else {
          console.log(123)
          await articleAddAPI({ draft: bool }, this.article)
          this.$message({
            message: '发布文章成功',
            type: 'success'
          })
        }

        Object.assign(this.article, this.$options.data().article)
      })
    },
    typeChange () {
      if (this.article.cover.type === 0 || this.article.cover.type === -1) {
        this.article.cover.images = []
      }
    }
  },
  async created () {
    const res = await channelListAPI()
    this.channelArr = res.data.data.channels
    if (this.$route.query.id) {
      this.artId = this.$route.query.id
      const artRes = await articleByIdAPI(this.artId)
      if (Object.keys(artRes.data.data).length === 0) {
        this.$message({
          message: '查无此文章',
          type: 'warning',
          onClose: () => {
            this.$router.replace('/layout/articleList')
          }
        })
      } else {
        this.article = artRes.data.data
      }
    }
  },
  components: {
    quillEditor,
    MyCover
  }
}
</script>

<style lang="less" scoped>
.publish-container /deep/ .ql-editor {
      height: 300px;
    }
</style>
