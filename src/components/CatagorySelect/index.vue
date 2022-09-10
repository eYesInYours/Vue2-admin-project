<template>
  <div>
    <!-- inline代表行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级联动">
        <el-select placeholder="请选择" v-model="cForm.category1Id" @change="handler1" :disabled="show">
          <el-option :label="c1.name" :value="c1.id" v-for="c1 in list1" :key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级联动">
        <el-select placeholder="请选择" v-model="cForm.category2Id" @change="handler2" :disabled="show">
          <el-option :label="c2.name" :value="c2.id" v-for="c2 in list2" :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级联动">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :label="c3.name" :value="c3.id" v-for="c3 in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CatagorySelect",
  data(){
    return {
        // 存放一级数据
        list1:[],
        // 存放二级数据
        list2:[],
        // 存放三级数据
        list3:[],
        // 收集相应的一级、二级、三级id
        cForm:{
            category1Id:'',
            category2Id:'',
            category3Id:'',
        }
    }
  },
  props:['show'],
  mounted(){
    this.getCategory1List()
  },
  methods:{
    // 获取一级数据方法
    async getCategory1List(){
        const result = await this.$API.attr.reqCategory1List()
        this.list1 = result.data
        // console.log("一级",result)
    },
    // 一级分类的select事件回调（当一级分类的option发生变化时获取相应的二级分类的数据）
    async handler1(){
        const { category1Id } = this.cForm
        let result = await this.$API.attr.reqCategory2List(category1Id)
        // console.log("二级",result)
        this.list2 = []
        this.list3 = []
        this.cForm.category2Id = ""
        this.cForm.category3Id = ""
        this.list2 = result.data
        this.$emit('getCategoryId',{categoryId:category1Id, level:1})
    },
    async handler2(){
      const { category2Id } = this.cForm
      let result = await this.$API.attr.reqCategory3List(category2Id)
      this.list3 = []
      this.cForm.category3Id = ''
      this.list3 = result.data
      // console.log("三级",result)
      this.$emit('getCategoryId',{categoryId:category2Id, level:2})
    },
    handler3(){
      // 第三级数据确认后就发送请求，展示列表
      const { category3Id } = this.cForm
      this.$emit('getCategoryId',{categoryId:category3Id, level:3})
    }
  }
};
</script>

<style>
</style>