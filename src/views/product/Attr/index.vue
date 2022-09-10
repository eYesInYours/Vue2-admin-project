<template>
  <div>
    <el-card style="margin:20px 0;">
      <CatagorySelect @getCategoryId="getCategoryId" :show="!isShowTable" /> 
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!category3Id">添加属性</el-button>
        <!-- 表格：展示平台属性 -->
        <el-table border :data="attrList" style="marginTop:10px">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150"></el-table-column>
          <el-table-column prop="prop" label="属性值列表">
            <template slot-scope="{row}">
                <el-tag type="success" v-for="attrValue in row.attrValueList" :key="attrValue.id" style="margin:0 12px">
                  {{attrValue.valueName}}
                </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="120">
            <template slot-scope="{row}">
              <el-button icon="el-icon-edit" type="warning" size="mini" @click="updateAttr(row)" style="marginRight:10px"></el-button>
              <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteAttr(row)">
                <el-button icon="el-icon-delete" type="danger" size="mini" slot="reference"></el-button>
              </el-popconfirm>
            </template>
            
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" :disabled="!attrInfo.attrName" @click="addAttrValue">添加属性值</el-button>
        <el-button>取消</el-button>

        <el-table border style="margin:16px 0" :data="attrInfo.attrValueList">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性值名称" prop="prop" width="width">
            <template slot-scope="{row, $index}">
              <el-input 
              v-model="row.valueName" placeholder="请输入属性值名称" size="mini"
              v-if="row.flag"
              v-focus
              @blur="toLook(row)"
              @keyup.native.enter="toLook(row)"
              :ref="$index"
              >
              </el-input>
              <span :v-model="row.valueName"
              style="display:block"
              v-else      
              @click="toEdit(row, $index)"
              >
              {{row.valueName}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" prop="prop" width="width">
            <template slot-scope="{row, $index}">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference">
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        
        <el-button type="primary" @click="addOrupdateAttr" :disabled="!attrInfo.attrValueList.length">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: "Attr",
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      // 品牌属性数据
      attrList:[],
      // 添加属性|修改属性，表格显示
      isShowTable:true,
      // 收集新增属性|修改属性所用
      attrInfo:{
        // 属性名
        attrName: "",
        // 属性值列表，可以有多个属性值
        attrValueList: [
          // 初始不应该有值，所以注掉，表格就不会显示input
          /* {
            // 相应属性名的id
            // attrId: 0,
            // 属性值
            // valueName: ""
          } */
        ],
        // 三级分类id，不能直接this指向category3Id，为undefined。对象存储数据无序存储。
        categoryId: 0,
        categoryLevel: 3,
      }
    }
  },
  methods:{
    // 获取子组件传来的id
    getCategoryId({categoryId, level}){
      console.log(`get${categoryId}`)
      if(level == 1){
        this.category2Id = ""
        this.category3Id = ""
        this.category1Id = categoryId
      }else if(level == 2){
        this.category3Id = ""
        this.category2Id = categoryId
      }else{
        this.category3Id = categoryId
        this.getAttrList()
      }
    },
    // 拿到三级id后，渲染数据列表
    async getAttrList(){
      console.log('发请求')
      const {category1Id, category2Id, category3Id} = this
      let result = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
      console.log(result)
      if(result.code == 200){
        this.attrList = result.data
      }
    },
    // 添加属性值回调
    addAttrValue(){
      this.attrInfo.attrValueList.push({
        // 指向对应属性名的id
        attrId:this.attrInfo.id,
        valueName:"",
        // 向每一个添加的属性值内放置一个标识，用以切换input和span的显示
        flag:true
      }),
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length-1].focus()
      })
    },
    // 添加属性相关回调，解决数据回显问题
    addAttr(){
      this.isShowTable = false
      this.attrInfo = {
        attrName: "",
        attrValueList: [
          
        ],
        // 调用该回调时，category3Id已经存在，可以收集
        categoryId: this.category3Id,
        categoryLevel: 3,
      }
    },
    // 修改属性
    updateAttr(row){
      this.isShowTable = false
      console.log(row)
      // 层级不止一层，要用深拷贝
      // 面试题中，深拷贝、浅拷贝是高频问题，需要达到手写程度
      this.attrInfo = cloneDeep(row)
      // 解决修改按钮中不能切换查看模式
      this.attrInfo.attrValueList.forEach(item => {
        this.$set(item,'flag',false)
      })
    },
    // 切换为查看模式（span）
    toLook(row){
      // 属性值不能为空
      if(!row.valueName.trim()){
        return this.$message('请输入属性值')
      }
      // 添加的属性值不能重复
      let isRepeat = this.attrInfo.attrValueList.some(item => {
        if(item != row){
          return item.valueName == row.valueName
        }
      })
      if(isRepeat){
        return this.$message('不能重复添加已有属性')
      }
      row.flag=false
    },
    toEdit(row, $index){
      row.flag = true
      // 给span绑定该回调，获取指定input元素，但切换需要时间，input未加载出来，获取不到ref节点
      this.$nextTick(() => {
        this.$refs[$index].focus()
      })
    },
    // 气泡确认款确定按钮的回调
    deleteAttrValue(index){
      this.attrInfo.attrValueList.splice(index, 1)
    },
    // 保存按钮，进行添加属性或修改属性的操作
    async addOrupdateAttr(){
      // flag字段不向服务器发送
      // 空的valueName需要过滤
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if(item.valueName != ''){
          // 删除flag字段
          delete item.flag
          return true
        }
      })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.isShowTable = true
        this.$message({type:"success",message:"保存成功"})
        this.getAttrList()
      } catch (error) {
        // this.$message({type:"error",message:"保存失败"})
      }
    },
    // 删除按钮，删除属性
    async deleteAttr(row){
      console.log(row)
      await this.$API.attr.reqDeleteAttr(row.id)
      this.getAttrList()
    }
  },
};
</script>

<style>
</style>