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
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三张</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
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
import { channelListAPI, articleAddAPI } from '@/api'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { articleAddRules } from '@/verify'

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
      rules: articleAddRules
    }
  },
  methods: {
    createFn (bool) {
      this.$refs.form.validate(async valid => {
        if (valid === false) return
        console.log(123)
        await articleAddAPI({ draft: bool }, this.article)
        this.$message({
          message: '发布文章成功',
          type: 'success'
        })
        Object.assign(this.article, this.$options.data().article)
      })
    }
  },
  async created () {
    const res = await channelListAPI()
    this.channelArr = res.data.data.channels
  },
  components: {
    quillEditor
  }
}
</script>

<style lang="less" scoped>
.publish-container /deep/ .ql-editor {
      height: 300px;
    }
</style>
