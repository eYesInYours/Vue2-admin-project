<template>
  <div>
    <el-table border style="width: 100%" :data="records">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="skuName" label="名称" width="250" align="center"></el-table-column>
      <el-table-column prop="skuDesc" label="描述" align="center" width="250"></el-table-column>
      <el-table-column label="默认图片" width="120">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量" width="80" align="center"></el-table-column>
      <el-table-column prop="price" label="价格" width="80" align="center"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="{ row }">
          <el-button type="warning" size="mini" icon="el-icon-download" @click="cancelSale(row)" v-if="row.isSale == 1"></el-button>
          <el-button type="success" size="mini" icon="el-icon-upload2" @click="sale(row)" v-else></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="showDrawer(row)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      align="center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="total"
    >
    </el-pagination>

    <!-- 抽屉 -->
    <el-drawer :visible.sync="drawer" :before-close="handleClose" size="50%" :show-close="false">
      <el-row>
        <el-col :span="6">名称</el-col>
        <el-col :span="14">{{skuList.skuName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">描述</el-col>
        <el-col :span="14">{{skuList.skuDesc}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">价格</el-col>
        <el-col :span="14">{{skuList.price}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6">平台属性</el-col>
        <el-col :span="14">
          <el-tag v-for="attr in skuList.skuAttrValueList" :key="attr.id" style="margin:2px 3px;">{{attr.attrId}}--{{attr.valueId}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">商品图片</el-col>
        <el-col :span="14">
          <el-carousel trigger="click" height="350px">
            <el-carousel-item v-for="item in skuList.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="width:100%;height:100%">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 16,
      records: [],
      // 抽屉显示
      drawer: false,
      // sku查看详情数据对象
      skuList:{}
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(pages = 1) {
      this.page = pages;
      let result = await this.$API.sku.reqGetSkuList(this.page, this.limit);
      if (result.code) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 下架
    async cancelSale(row) {
      let result = await this.$API.sku.reqCancelSale(row.id);
      if (result.code == 200) {
        row.isSale = 0;
        this.$message({ type: "success", message: "下架成功" });
      }
    },
    // 上架
    async sale(row) {
      let result = await this.$API.sku.reqOnSale(row.id);
      if (result.code == 200) {
        row.isSale = 1;
        this.$message({ type: "success", message: "上架成功" });
      }
    },
    // 正在开发
    edit() {
      this.$message("正在开发中");
    },
    async showDrawer(row) {
      this.drawer = true
      let result = await this.$API.sku.reqGetSkuById(row.id)
      console.log(result)
      if(result.code == 200){
        this.skuList = result.data
      }
    },
    handleClose(){
      this.drawer = false
    },
  },
};
</script>

<style>
.el-col-6{
  text-align:right;
  font-weight:bold;
}
.el-col{
  margin:10px;
}
.el-carousel__button{
  width:8px;
  height:8px;
  border-radius:4px;
  background-color:lightblue;
}
</style>