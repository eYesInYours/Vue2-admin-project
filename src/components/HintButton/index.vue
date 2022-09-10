<template>
  <a :title="title" style="margin:10px">
    <!-- $listeners接收除了带有.native事件修饰符的所有事件监听器 -->
    <!-- attr 是接收父组件传过来的数据（类似于props）   listenter 获得父组件给子组件的自定义事件 -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
export default {
    name:'HintButton',
    props:['title']
}
</script>

<style>

</style>