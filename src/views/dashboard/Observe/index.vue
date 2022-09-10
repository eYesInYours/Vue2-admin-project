<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <Search></Search>
    </el-col>
    <el-col :span="12">
      <Proportion></Proportion>
    </el-col>
  </el-row>
</template>

<script>
import Search from './Search'
import Proportion from './Proportion'
export default {
  name:'',
  components:{Search, Proportion}
}
</script>

<style>

</style>