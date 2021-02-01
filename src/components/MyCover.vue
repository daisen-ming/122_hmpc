<!-- 发布文章/封面组件 -->
<template>
  <div class="my-cover">
    <!-- 图片按钮(组件使用后上来显示的图片) -->
    <div class="btn_img" @click="openDialog()">
      <img src="../assets/default.png" />
    </div>

    <!-- 对话框(默认不显示)
    append-to-body为true, 弹出层显示在body之上
    visible 是否显示dialog(弹出层), sync作用子组件可以修改后面变量的值
     -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab切换组件 -->
      <!-- v-model绑定的是name属性的值(默认第一个高亮) -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
             <!-- 菜单 -->
          <div style="padding-bottom: 20px">
            <el-radio-group v-model="imgType" size="mini">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <!-- 分栏布局
              :gutter  栅格间隔
              :xs <768px 响应式栅格数或者栅格属性对象
              :sm ≥768px 响应式栅格数或者栅格属性对象
              :md ≥992px 响应式栅格数或者栅格属性对象
              :lg ≥1200px 响应式栅格数或者栅格属性对象
             -->
          <el-row :gutter="10" class="img_list">
            <el-col
              class="img_item"
              :xs="12"
              :sm="6"
              :md="6"
              :lg="4"
              v-for=" obj in imgList"
              :key="obj.id"
            >
              <!-- 确定图片如何适应容器框fit:cover -->
              <el-image
                style="height: 100px"
                :src="obj.url"
                fit="cover"
              ></el-image>
            </el-col>
          </el-row>
          <!-- 分页组件 prev上一页, next下一页按钮, pager页码, total分页数 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            @current-change='changePage'
            :current-page="reqParams.page"
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { UserImageListAPI } from '@/api'
import defaultPng from '@/assets/default.png' // 因为项目底层都是用webpack打包的assets图片, 转成base64字符串, 所以需要引入使用
export default {
  name: 'MyCover',
  data () {
    return {
      coverImageUrl: defaultPng, // 确认选择的图片地址
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      imgList: [], // 图片素材数组
      imgType: '全部', // 默认显示 '全部'//全部/收藏图片标签栏的文字绑定
      total: 0
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    async getUserImgFn () {
      const res = await UserImageListAPI(this.reqParams)
      // console.log(res)
      this.imgList = res.data.data.results
      this.total = res.data.data.total_count
    },
    changePage (page) {
      this.reqParams.page = page
      this.getUserImgFn()
    }
  },
  watch: {
    imgType (newVal) {
      this.reqParams.collect = !(newVal === '全部')
      this.reqParams.page = 1
      //   if (newVal === '全部') {
      //     this.reqParams.collect = false// 全部
      //   } else {
      //     this.reqParams.collect = true// 收藏
      //   }
      this.getUserImgFn()
    }
  },
  async created () {
    this.getUserImgFn()
  }
}
</script>

<style scoped lang='less'>
/* 图片按钮 */
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
/* 素材列表 */
.img_list {
  margin-top: 15px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
/* 素材列表 */
.img_item {
  position: relative;
}
</style>
