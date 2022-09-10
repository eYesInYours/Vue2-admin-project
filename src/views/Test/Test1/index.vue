<template>
  <div>
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btntest.add1') != -1">按钮测试1</el-button>
    <el-button type="primary" v-show="$store.state.user.buttons.indexOf('btntest.add2') != -1">按钮测试2</el-button>
  </div>
</template>

<script>
export default {
    name:"Test1"
};
</script>

<style>
</style>