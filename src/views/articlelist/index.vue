<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form"
               label-width="80px">
        <el-form-item label="文章状态:">
          <el-radio-group v-model="queryParams.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="item in articleStatus"
                      :key="item.id"
                      :label="item.id">{{item.lable}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表:">
          <!-- <el-select v-model="queryParams.channel_id"
                     placeholder="请选择">
            <el-option value=""
                       label="全部"></el-option>
            <el-option v-for='item in articleChannels'
                       :label="item.name"
                       :key='item.id'
                       :value="item.id">
            </el-option> -->
          <!-- </el-select> -->
          <article-channel v-model="queryParams.channel_id"></article-channel>

        </el-form-item>
        <el-form-item label="时间选择:">
          <el-date-picker v-model="value1"
                          @change='handledate'
                          type="daterange"
                          format="yyyy - MM - dd"
                          value-format="yyyy-MM-dd"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="isLoading"
             class="box-card content">
      <div slot="header"
           class="clearfix">
        <span style="font-size:14px">共找到{{total_count}}条符合条件的内容</span>
      </div>
      <ul>
        <li v-for='item in articleList'
            :key="item.id[1]">
          <div class="cover">
            <img :src="item.cover.images[0]"
                 alt="">
          </div>
          <dl class="right">
            <div class="title">
              <h4>{{item.title}}</h4>
              <div class="btn">
                <el-link icon="el-icon-edit"
                         @click="$router.push({
                            name:'edit',
                            params:{
                              id:item.id
                            }
                          })">编辑
                </el-link>
                <el-link @click.prevent="handleDelete(item.id)"
                         icon="el-icon-delete">删除
                </el-link>
              </div>
            </div>
            <div class="status">
              <el-tag :type="articleStatus[item.status].type">{{ articleStatus[item.status].lable }}</el-tag>
            </div>
            <p class="time">{{item.pubdate}}</p>
          </dl>
        </li>
      </ul>
    </el-card>
    <el-pagination background
                   :page-size='10'
                   :disabled='isLoading'
                   :current-page='page'
                   @current-change='handleGetArticle'
                   layout="prev, pager, next"
                   :total='+total_count'>
    </el-pagination>
  </div>
</template>

<script>
import articleChannel from '@/components/article-channel'
export default {
  name: 'artile',
  props: {},
  data () {
    return {
      // 时间中间转换
      value1: '',
      articleList: [],
      articleStatus: [
        {
          id: '0',
          type: 'warning',
          lable: '草稿'
        },
        {
          id: 1,
          type: '',
          lable: '待审核'
        },
        {
          id: 2,
          type: 'success',
          lable: '审核通过'
        },
        {
          id: 3,
          type: 'danger',
          lable: '审核失败'
        },
        {
          id: 4,
          type: 'info',
          lable: '已删除'
        }
      ],
      // articleChannels: [],
      // 文章总数
      total_count: '',
      isLoading: false,
      // 当前页数
      page: 1,
      queryParams: {
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: ''
      }
    }
  },
  computed: {
    queryParamsEnd () {
      let querydata = {}
      for (let key in this.queryParams) {
        if (this.queryParams[key]) {
          querydata[key] = this.queryParams[key]
        }
      }
      return querydata
    }
  },
  created () {
    this.handleGetArticle(1)
    // this.handleChannels()
  },
  mounted () { },
  watch: {
    queryParamsEnd () {
      this.page = 1
      this.handleGetArticle()
    }
  },
  methods: {
    // 获取筛选时间
    handledate () {
      if (this.value1) {
        this.queryParams.begin_pubdate = this.value1[0]
        this.queryParams.end_pubdate = this.value1[1]
      } else {
        this.queryParams.begin_pubdate = this.queryParams.end_pubdate = ''
      }
    },
    // 获取文章数据
    handleGetArticle (page = 1) {
      this.page = page
      this.isLoading = true
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          page: page,
          ...this.queryParamsEnd
        }
      }).then(data => {
        this.articleList = data.results
        this.total_count = data.total_count
        this.isLoading = false
        // console.log(data)
      })
    },
    // 删除文章
    handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: 'DELETE',
          url: `/articles/${id}`
        }).then(data => {
          this.handleGetArticle(this.page)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    // 获取文章频道
    // handleChannels () {
    //   this.$axios({
    //     method: 'GET',
    //     url: '/channels'
    //   }).then(res => {
    //     // console.log(res)
    //     this.articleChannels = res.channels
    //   })
    // }
  },
  components: {
    articleChannel
  }
}
</script>

<style scoped lang="less">
.el-button--text {
  color: black;
}
.el-button--text:active {
  color: red;
}
.box-card {
  margin-bottom: 20px;
}
.content {
  li {
    padding: 20px 0;
    height: 150px;
    border-bottom: 1px dashed #ccc;
    .cover {
      float: left;
      img {
        width: 180px;
        height: 150px;
      }
    }
    .status {
      margin-top: 15px;
    }
    .time {
      font-size: 12px;
      color: #666;
    }
    .right {
      margin: 0;
      margin-left: 200px;
      h4 {
        display: inline-block;
        margin: 0;
        width: 400px;
        overflow: hidden;
      }
      .btn {
        float: right;
      }
    }
    .el-link {
      margin-right: 10px;
    }
  }
}
</style>
