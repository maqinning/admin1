
// 获取频道列表组件
<template>
  <el-select :value="value"
             clearable
             placeholder="请选择活动区域"
             @change='handleEmit'>
    <el-option v-for="item in channels"
               :key="item.id"
               :label="item.name"
               :value="item.id">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  computed: {},
  created () {
    this.handleGetChannels()
  },
  mounted () { },
  watch: {},
  methods: {
    handleEmit (val) {
      this.$emit('input', val)
    },
    handleGetChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(data => {
        // console.log(data)
        this.channels = data.channels
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
</style>
