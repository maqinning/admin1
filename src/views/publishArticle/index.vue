<template>
  <el-card class="publish-box">
    <div slot="header"
         class="clearfix">
      <span>{{hasId?'编辑':'发布'}}文章</span>
    </div>
    <el-form label-width="100px">
      <el-form-item label="标题:">
        <el-input style="width:300px"
                  placeholder="文章名称"
                  v-model="articledata.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <quill-editor v-model="articledata.content"
                      ref="myQuillEditor"
                      :options="editorOption">
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面:"></el-form-item>
      <el-form-item label="频道:">
        <articleChannel v-model='articledata.channel_id'></articleChannel>

      </el-form-item>
      <el-form-item>
        <el-button type="success"
                   @click='handlepublish(false)'>{{hasId?'编辑':'发布'}}</el-button>
        <el-button type="info"
                   @click='handlepublish(true)'>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import articleChannel from '@/components/article-channel/index.vue'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'publish',
  props: {},
  data () {
    return {
      articledata: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      editorOption: {
        // some quill options
      },
      formdirty: false
      // value: 3
    }
  },
  computed: {
    hasId () {
      return this.$route.params.id
    },
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  },
  created () {
    if (this.hasId) {
      this.handleGetEditArticle()
    }
  },
  mounted () {
    // console.log('this is current quill instance object', this.editor)
  },
  watch: {
    articledata: {
      handler: function () {
        this.formdirty = true
      },
      deep: true
    }
  },
  methods: {

    // 发布文章
    handlepublish (draft) {
      if (this.hasId) {
        this.handleEditArticle(draft)
      } else {
        this.$axios({
          method: 'POST',
          url: '/articles',
          data: this.articledata,
          params: {
            draft
          }
        }).then(data => {
          this.$message({
            message: '恭喜你，发布成功',
            type: 'success'
          })
          this.$router.push({
            name: 'article'
          })
        }).catch(err => {
          console.log(err)
          this.$message.error('发布失败')
        })
      }
    },
    // 获取编辑文章内容
    handleGetEditArticle () {
      this.$axios({
        method: 'GET',
        url: '/articles/' + this.hasId
      }).then(data => {
        this.articledata = data
      }).catch(err => {
        console.log(err)
        this.$message.error('获取文章失败')
      })
    },
    // 编辑文章
    handleEditArticle (draft) {
      this.$axios({
        method: 'PUT',
        url: '/articles/' + this.hasId,
        data: this.articledata,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          message: '编辑文章成功',
          type: 'success'
        })
        this.$router.push({
          name: 'article'
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('编辑文章失败')
      })
    }
  },
  components: {
    // 富文本组件
    quillEditor,
    // 获取文章频道组件
    articleChannel
  },
  beforeRouteLeave (to, from, next) {
    if (!this.formdirty) return next()
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  min-height: 100%;
}
</style>
