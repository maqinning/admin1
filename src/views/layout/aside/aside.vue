<template>
  <div class="box">
    <div class="logo">
      <img src="./logo_admin.png"
           alt="">
    </div>
    <el-menu default-active="1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#409EFF">
      <el-menu-item index="3">
        <i class="iconfont icon-shouye"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="iconfont icon-neirong"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">发布文章</el-menu-item>
          <el-menu-item index="1-2">内容列表</el-menu-item>
          <el-menu-item index="1-3">评论列表</el-menu-item>
          <el-menu-item index="1-4">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="iconfont icon-fensi"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">图文数据</el-menu-item>
          <el-menu-item index="2-2">粉丝概况</el-menu-item>
          <el-menu-item index="2-3">粉丝画像</el-menu-item>
          <el-menu-item index="2-4">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="iconfont icon-zhanghu"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'appaside',
  props: {},
  data () {
    return {}
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.el-menu {
  width: 100%;
  height: 100%;
  .el-menu-item,
  span {
    font-size: 16px;
  }

  .iconfont {
    margin-right: 10px;
    font-size: 20px;
  }
  .icon-shouye {
    font-size: 24px;
  }
}
.box {
  overflow: hidden;
}
.logo {
  text-align: center;
  height: 70px;
  width: 100%;
  line-height: 70px;
  img {
    height: 35px;
    vertical-align: middle;
  }
}
</style>
