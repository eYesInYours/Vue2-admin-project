<template>
  <el-form label-width="80px">
    <el-form-item label="SPU名称"> 海绵宝宝 </el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="sku.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="sku.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(千克)">
      <el-input placeholder="重量(千克))" v-model="sku.weight"></el-input>
    </el-form-item>
    <el-form-item label="规格描述">
      <el-input placeholder="规格描述" type="textarea" rows="3" v-model="sku.skuDesc"></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item v-for="skuInfo in skuInfoArr" :key="skuInfo.id" :label="skuInfo.attrName">
          <el-select placeholder="请选择" v-model="skuInfo.skuInfoAndValueId">
            <el-option v-for="attrValue in skuInfo.attrValueList" :key="attrValue.id" :value="`${skuInfo.id}:${attrValue.id}`" :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="80px">
        <el-form-item v-for="sale in saleArr" :key="sale.id" :label="sale.saleAttrName">
          <el-select placeholder="请选择" v-model="sale.saleAndValueId">
            <el-option :value="`${sale.id}:${saleValue.id}`" v-for="saleValue in sale.spuSaleAttrValueList" :key="saleValue.id" :label="saleValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item>
      <!-- selection-change	当选择项发生变化时会触发该事件 -->
      <el-table border :data="skuImageArr" @selection-change="handleSelectionChange">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{row}">
            <img :src="row.imgUrl" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
        <el-table-column prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" v-if="row.isDefault == 0" @click="setDefault(row)">设为默认</el-button>
            <el-button v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name:'',
  data(){
    return {
      // 图片数据存放位置
      skuImageArr:[],
      // 平台属性存放位置
      skuInfoArr:[],
      // 销售属性存放位置
      saleArr:[],
      // sku
      sku:{
        category3Id: 0,
        id: 0,
        skuName: "",
        price: '',
        weight: "",
        skuDesc: "",
        isSale: 0,
        skuAttrValueList: [
          /* {
            attrId: 0,
            valueId: 0,
          } */
        ],
        // 默认图片地址
        skuDefaultImg: "",
        skuSaleAttrValueList: [
          /* {
            "id": 0,
            "saleAttrId": 0,
            "saleAttrName": "string",
            "saleAttrValueId": 0,
            "saleAttrValueName": "string",
            "skuId": 0,
            "spuId": 0
          } */
        ],
        skuImageList: [
          /* {
            "imgName": "string",
            "imgUrl": "string",
            "isDefault": "string",
            "spuImgId": 0
          } */
        ],

        spuId: 0,
        tmId: 0,
        
      },
      // 用户选择的图片信息
      userSelectImg:[]
    }
  },
  methods:{
    // 进入sku组件，发请求获取数据
    async getData(category1Id, category2Id, spu){
      // 获取图片数据
      let imageResult = await this.$API.sku.reqSpuImageList(spu.id)
      if(imageResult.code == 200){
        let imageArr = imageResult.data
        imageArr.forEach(item => {
          item.isDefault = 0
        })
        this.skuImageArr = imageArr
      }

      // 获取平台属性数据
      let infoResult = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.category3Id)
      if(infoResult.code == 200){
        this.skuInfoArr = infoResult.data
      }

      // 获取销售属性数据
      let saleResult = await this.$API.sku.reqSaleAttrList(spu.id)
      if(saleResult.code == 200){
        this.saleArr = saleResult.data
      }
    },
    // 设置图片默认（排他）
    setDefault(row){
      this.skuImageArr.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.sku.skuDefaultImg = row.imgUrl
    },
    // table选项（选择框）改变事件
    // 收集用户选择的图片信息，之后保存要提交到服务器上
    handleSelectionChange(params){
      this.userSelectImg = params
    },
    async save(){
      const {skuInfoArr, sku, saleArr, skuImageArr} = this

      // 将平台属性收集到sku中
      // prev初始值，item每个元素。会遍历
      sku.skuAttrValueList = skuInfoArr.reduce((prev, item) => {
        if(item.skuInfoAndValueId){
          const [attrId, valueId] = item.skuInfoAndValueId.split(':')
          prev.push({attrId, valueId})
        }
        return prev
      },[])

      // 将销售属性收集到sku中
      sku.skuSaleAttrValueList = saleArr.reduce((prev, item) => {
        if(item.saleAndValueId){
          cosnt [saleAttrId, saleAttrValueId] = item.saleAndValueId
          prev.push({saleAttrId, saleAttrValueId})
        }
        return prev
      },[])

      // 将图片收集到sku中
      sku.skuImageList = skuImageArr.map(item => {
        return {
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })

      // 发请求
      let result = await this.$API.sku.reqAddSku(sku)
      console.log(result)
      if(result.code == 200){
        this.$emit('changeScene',0)
      }
    },
    cancel(){
      this.$emit('changeScene',0)
      Object.assign(this._data,this.$options.data())
    }
  }
}
</script>

<style>
</style>