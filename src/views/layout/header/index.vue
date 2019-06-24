<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content">江苏传智播客教育科技股份有限公司</div>
    </el-col>
    <el-col :span="12">
      <div class="user_infor">
        <span>消息</span>
        <img src="./avatar.jpg"
             alt="">
        <el-dropdown>
          <span class="el-dropdown-link">
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
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
    return {}
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="less">
.el-row {
  height: 100%;
  line-height: 60px;
  .user_infor {
    text-align: right;
    img {
      width: 35px;
      border-radius: 18px;
      vertical-align: middle;
      margin: 0 10px;
    }
  }
}
</style>
