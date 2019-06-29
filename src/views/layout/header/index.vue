<template>
  <el-row>
    <el-col :span="14">
      <div class="grid-content"><i class="iconfont icon-alignright-fill"></i><span>江苏传智播客教育科技股份有限公司</span></div>
    </el-col>
    <el-col :span="10">
      <div class="user_infor">
        <span>消息</span>

        <el-dropdown @command="handleDropout">
          <div class="el-dropdown-link">
            <img :src="user_infor.photo"
                 alt="">
            <span>
              {{user_infor.name}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
          </div>

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户设置</el-dropdown-item>
            <el-dropdown-item command='dropout'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'appheader',
  props: {},
  data () {
    return {
      user_infor: {}
    }
  },
  computed: {},
  created () {
    this.user_infor = JSON.parse(window.localStorage.getItem('user_infor'))
  },
  mounted () { },
  watch: {},
  methods: {
    handleDropout (param) {
      if (param === 'dropout') {
        window.localStorage.removeItem('user_infor')
        window.location.reload()
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-row {
  .el-dropdown-link {
    cursor: pointer;
  }
  .iconfont {
    margin-right: 10px;
  }
  height: 100%;
  line-height: 60px;
  .user_infor {
    text-align: right;
    img {
      width: 35px;
      border-radius: 18px;
      vertical-align: middle;
      margin: 0 7px 0 10px;
    }
  }
}
.el-dropdown-menu {
  margin-right: 20px;
}
</style>
