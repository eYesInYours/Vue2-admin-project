<template>
  <el-form label-width="80px" :data="spu">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
    </el-form-item>

    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" v-model="spu.tmId">
        <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input type="textarea" rows="3" v-model="spu.description"></el-input>
    </el-form-item>

    <!-- 
      list-type	文件列表的类型
      file-list 上传的文件列表
     -->
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :file-list="spuImage"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-select :placeholder="`还有${unselectAttr.length}未选择`" v-model="attrIdAndName">
        <el-option v-for="us in unselectAttr" :key="us.id" :value="`${us.id}:${us.name}`" :label="us.name"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
      <el-table border :data="spu.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="110"></el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="150"></el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{row}">
            <!-- @close="handleClose(tag)" -->
            <el-tag
              :key="tag.id"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
              {{tag.saleAttrValueName}}
            </el-tag>
            <!-- @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm" -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
              @blur="handleInputConfirm(row)"
              @keyup.enter.native="handleInputConfirm(row)"
            >
            </el-input>
            <!-- @click="showInput" -->
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
          <template slot-scope="{$index}">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index, 1)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存放spu信息
      // 修改spu中，数据收集到从服务器上返回的对象上，而添加中，需要规定字段名和后端一致，日后发请求
      spu: {
        category3Id: 0,
        description: "",
        spuImageList: [
          /* {
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          }, */
        ],
        spuName: "",
        // 选择品牌的id
        tmId: 0,
        spuSaleAttrList: [
          // {
          //   baseSaleattrIdAndName: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleattrIdAndName: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
        
      },
      // 存放品牌列表数据
      trademarkList: [],
      // 存放spu照片
      spuImage: [],
      // 存放平台全部的销售属性
      saleAttrList: [],
      // 收集未选择的销售属性的id和name
      attrIdAndName:'',
      // spu中
      inputVisible:false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // file标识当次删除的照片，fileList标识删除后剩余的那些照片
      console.log(file, fileList);
      this.spuImage = fileList
    },
    handleSuccess(response, file, fileList){
      this.spuImage = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化，每次进该子组件，都将发四个请求
    async reqInitData(spu) {  
      // spu
      let spuResult = await this.$API.spu.reqGetSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }

      // 品牌
      let TrademarkResult = await this.$API.spu.reqGetTrademarkList();
      if (TrademarkResult.code == 200) {
        this.trademarkList = TrademarkResult.data;
      }

      // 图片
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let arrList = spuImageResult.data;
        // upload组件要求file-list列表数组数据中，包含name、url两个字段，所以对服务器返回数据处理
        arrList.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })
        this.spuImage = arrList
      }

      // 销售属性
      let saleAttrResult = await this.$API.spu.reqSaleAttrList();
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data;
      }
    },
    async initAddReq(category3Id){
      let TrademarkResult = await this.$API.spu.reqGetTrademarkList();
      if (TrademarkResult.code == 200) {
        this.trademarkList = TrademarkResult.data;
      }

      let saleAttrResult = await this.$API.spu.reqSaleAttrList();
      if (saleAttrResult.code == 200) {
        this.saleAttrList = saleAttrResult.data;
      }

      this.spu.category3Id = category3Id
    },
    // 添加销售属性 baseSaleAttrId  saleAttrName  spuSaleAttrValueList
    addSaleAttr(){
      let [baseSaleAttrId, saleAttrName] = this.attrIdAndName.split(":")
      let newSaleAttrObj = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList:[]
      }
      // table表格与spuSaleAttrList数据绑定，所以往其内添加数据，就可以实现添加新的销售属性的初步功能
      this.spu.spuSaleAttrList.push(newSaleAttrObj)
      this.attrIdAndName = ''
    },
    // 添加销售属性值
    showInput(row){
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue',"")
    },
    // 输入销售属性值后，input失去焦点
    // 要将baseSaleAttrId、saleAttrValueName添加进属性值数组对象中
    handleInputConfirm(row){
      let {baseSaleAttrId, inputValue} = row

      // 对输入值进行校验，不能为空，不能重复
      if(inputValue.trim() == ""){
        return this.$message('输入不能为空')
      }
      // some，如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。
      let isTrue = row.spuSaleAttrValueList.some(item => 
        item.saleAttrValueName == inputValue
      )
      if(isTrue){
        return this.$message('输入不能重复')
      }

      let newSaleValObj = {
        baseSaleAttrId,
        saleAttrValueName:inputValue
      }
      row.spuSaleAttrValueList.push(newSaleValObj)

      row.inputVisible = false
    },
    // 修改spu | 添加spu
    async addOrUpdateSpu(){
      // 照片墙的数据需要imgUrl和imgName字段，且存放到spu中
      // map映射
      this.spu.spuImageList = this.spuImage.map(item => {
        return {
          imgUrl:(item.response && item.response.data) || item.url,
          imgName:item.name
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      if(result.code == 200){
        this.$emit('changeScene',{scene:0, flag:this.spu.id?'修改':'添加'})
        this.$message({type:'success',message:this.spu.id ? "修改成功" : "添加成功"})
      }
      // 数据清空，将配置项中的data（初始为空）赋给响应式数据_data。解决数据回显问题
      Object.assign(this._data, this.$options.data())
    },
    cancel(){
      this.$emit('changeScene', {scene:0, flag:''})
      // 清除数据
      Object.assign(this._data,this.$options.data())
    }
  },
  computed:{
    unselectAttr(){
      // 用接口获取到的品牌数据（共三个）和spu中的品牌数据比对
      let result = this.saleAttrList.filter(item => {
        // every数组方法返回布尔值，filter所得布尔值为真者保留
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return result
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>