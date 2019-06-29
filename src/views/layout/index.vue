<template>
  <el-container>
    <el-aside width="200px">
      <appaside></appaside>
    </el-aside>
    <el-container>
      <el-header>
        <appheader></appheader>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Appheader from './header/index.vue'
import Appaside from './aside/aside.vue'
export default {
  name: 'layout',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {
    Appheader,
    Appaside
  }
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
  .el-header {
    background-color: #f2f6fc;
  }
  .el-aside {
    background-color: #606266;
  }
}
</style>
