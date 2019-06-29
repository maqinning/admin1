<template>
  <div>
    <el-table :data="commentList"
              stripe
              style="width: 100%">
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column prop="total_comment_count"
                       label="总评论数"
                       width="150">
      </el-table-column>
      <el-table-column prop="fans_comment_count"
                       label="粉丝评论数"
                       width="150">
      </el-table-column>
      <el-table-column label="评论状态"
                       width="150">

        <template slot-scope="scope">
          <el-switch v-model="scope.row.comment_status"
                     active-color="#13ce66"
                     :disabled="scope.row.isdisabled"
                     @change='handleAllowComment(scope.row)'
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {},
  data () {
    return {
      commentList: [],
      totalCount: '',
      page: 1
    }
  },
  computed: {},
  created () {
    this.handleCommentList()
  },
  mounted () { },
  watch: {},
  methods: {
    // 获取每页评论
    // handleupdata (val) {
    //   this.page = val
    //   // this.handleCommentList(page)
    // },
    // 修改评论状态
    handleAllowComment (val) {
      val.isdisabled = true
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: val.id.toString()
        },
        data: {
          allow_comment: val.comment_status
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        val.isdisabled = false
      }).catch(err => {
        console.log(err)
        this.$message.error('修改失败')
        val.isdisabled = false
        val.comment_status = !val.comment_status
      })
    },
    // 获取评论列表
    handleCommentList () {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page,
          response_type: 'comment'
        }
      }).then(data => {
        data.results.forEach(item => {
          item.isdisabled = false
        })
        this.totalCount = data.total_count
        this.commentList = data.results
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-table {
  margin-bottom: 30px;
}
</style>
