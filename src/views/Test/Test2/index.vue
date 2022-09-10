<template>
  <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btntest.add3') != -1">按钮测试3</el-button>
</template>

<script>
export default {
    name:"Test2"
}
</script>

<style>

</style>