<template>
  <div>
    <el-card style="margin:20px 0;">
      <CatagorySelect @getCategoryId="getCategoryId" :show="scene!=0" /> 
    </el-card>
    <el-card>
      <!-- 这里将来有三个部分进行操作 -->
      <div v-show="scene == 0">
        <el-button type="primary" icon="el-icon-plus" @click="addSpu" :disabled="!category3Id">添加SPU</el-button>

        <el-table border style="margin:15px 0;" :data="records">
          <el-table-column type="index" label="序号" width="120" style=""></el-table-column>
          <el-table-column prop="spuName" label="spu名称" width="width"></el-table-column>
          <el-table-column prop="description" label="spu描述" width="width"></el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row}">
              <hint-button type="success" sizi="mini" icon="el-icon-plus" title="添加sku" @click="addSku(row)"></hint-button>
              <hint-button type="warning" sizi="mini" icon="el-icon-edit" title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info" sizi="mini" icon="el-icon-info" title="查看当前spu的全部sku列表" @click="checkSku(row)"></hint-button>
              <el-popconfirm title="确定删除吗？" @onConfirm="deleteSpu(row)">
                <hint-button type="danger" sizi="mini" icon="el-icon-delete" title="删除spu" slot="reference"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination 
        style="text-align:center"
        layout="prev, pager, next, jumper, ->, sizes, total"
        :total="total"
        :page-sizes="[3,5,10]"
        :page-size="3"
        :current-page="6"
        @size-change="handleSizeChange"
        @current-change="getSpuList"
        >
        </el-pagination>  
      </div>
      <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene == 2" ref="sku" @changeScene="changeScene2"></SkuForm>
    </el-card>
    <!-- 
      before-close	关闭前的回调，会暂停 Dialog 的关闭	function(done)，done 用于关闭 Dialog
     -->
  <el-dialog :title="`${spuName}的sku列表`" :visible.sync="dialogTableVisible" :before-close="close">
    <el-table border :data="skuList" v-loading="loading">
      <el-table-column prop="skuName" label="名称" width="width"></el-table-column>
      <el-table-column prop="price" label="价格" width="width"></el-table-column>
      <el-table-column prop="weight" label="重量" width="width"></el-table-column>
      <el-table-column prop="address" label="默认图片" width="width">
        <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm'
import SpuForm from './SpuForm'
export default {
    name:'Spu',
    data(){
      return {
        category1Id:"",
        category2Id:"",
        category3Id:"",
        page:'1',
        limit:'3',
        total:23,
        // 存放列表数据
        records:[],
        // 控制组件切换显示
        scene:0,   // 0 spu列表数据显示    1 添加spu|修改spu     2 添加sku
        dialogTableVisible:false,
        // 查看spu中的sku列表
        skuList:[],
        // 用于展示sku列表的名称
        spuName:'',
        // sku列表的loading效果
        loading:true
      }
    },
    components:{
      SkuForm,
      SpuForm
    },
    methods:{
      getCategoryId({categoryId, level}){
        if(level == 1){
          this.category1Id = categoryId
          this.category2Id = ''
          this.category3Id = ''
        }else if(level == 2){
          this.category2Id = categoryId
          this.category3Id = ''
        }else{
          this.category3Id = categoryId
          this.getSpuList()
        }
      },
      async getSpuList(pages = 1){
        this.page = pages
        const {page, limit, category3Id} = this
        let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
        if(result.code == 200){
          this.records = result.data.records
          this.total = result.data.total
        }
      },
      handleSizeChange(limit){
        this.limit = limit
        this.getSpuList()
      },
      addSpu(){
        this.scene = 1
        this.$refs.spu.initAddReq(this.category3Id)
      },
      updateSpu(row){
        this.scene = 1
        this.$refs.spu.reqInitData(row)
      },
      changeScene({scene, flag}){
        this.scene = scene
        if(flag == '修改'){
          this.getSpuList(this.page)
        }else{
          this.getSpuList()
        }
      },
      // sku通知切换场景
      changeScene2(scene){
        this.scene = scene
      },
      // 删除spu
      async deleteSpu(row){
        let result = await this.$API.spu.reqDeleteSpu(row.id)
        if(result.code == 200){
          this.getSpuList(this.records.length > 1 ? this.page : this.page-1)
        }
      },
      // 添加sku
      addSku(row){
        this.scene = 2
        this.$refs.sku.getData(this.category1Id, this.category2Id, row)
      },
      // 查看spu中的所有sku列表
      async checkSku(spu){
        this.dialogTableVisible = true
        let result = await this.$API.sku.reqFindSku(spu.id)
        if(result.code == 200){
          this.skuList = result.data
          this.spuName = spu.spuName
          // 获取到数据就不需要loading显示了
          this.loading = false
        }
      },
      // 关闭sku列表后，处理数据回显，以及只能显示一次loading的问题
      close(done){
        this.loading = true
        this.skuList = []
        done()
      }
    }
}
</script>

<style>

</style>