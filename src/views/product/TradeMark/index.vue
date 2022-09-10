<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click.native="showDialog">添加</el-button>

    <!-- 
    表单组件
    data:表格组件将来要展示的数据------数组类型
    border:是给表格添加边框
    column属性
    label:显示标题
    width:对应列的宽度
    align:标题的对齐方式
    prop:对应列内容的字段名
    注意1: elmentuI当中的table组件，展示的数据是以一列一列进行展示数据

   -->
    <el-table style="width: 100%; marginTop: 10px" border :data="list">
      <el-table-column type="index" label="序号" width="100" align="center">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="305"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center" width="305">
        <template slot-scope="{ row, }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" align="center" width="305">
        <!-- { row, $index } -->
        <!-- rou对应这一行的信息 -->
        <template slot-scope="{ row }">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click.native="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页器
      current-page      表示当前第几页
      pager-count	      页码按钮的数量，当总页数超过该值时会折叠
      @current-change   currentPage 改变时会触发
      page-size	        每页显示条目个数
      page-sizes	      每页显示个数选择器的选项设置
      pager-count	      页码按钮的数量，当总页数超过该值时会折叠
      total	            总条目数
      size-change	      pageSize 改变时会触发
     -->
    <el-pagination
      style="textAlign: right; margintop: 6px"
      @current-change="getPageList"
      @size-change="handleSizeChange"
      :current-page="page"
      :page-sizes="[4, 5, 10, 20]"
      :page-size="limit"
      :pager-count="5"
      layout="prev, pager, next, jumper, sizes"
      :total="total"
    >
    </el-pagination>

    <!-- 
      对话框
     -->
    <!-- 
    Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
     -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width:85%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!-- 
            上传图片 
            :on-success="handleAvatarSuccess"           上传成功
            :before-upload="beforeAvatarUpload"         上传之前
            -->
            <!-- 
              这里收集数据，不能使用v-model，因为不是表单元素
              action:设置图片上传的地址
             -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" 
            >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    // 自定义验证规则
    let validateTmName = (rule, value, callback) => {
        if(value.length < 2 || value.length > 8){
          callback(new Error('（自定义）长度在2到8个字符'))
        }else{
          callback()
        }
      };
    return {
      // 代表分页器第几页
      page: 1,
      // 当前页数展示数据
      limit: 4,
      // 数据总共多少条
      total: 20,
      // 列表展示数据
      list: [],
      // Dialog是否显示
      dialogFormVisible:false,
      // 上传图片使用的属性
      imageUrl:'',
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      // 验证规则
      rules:{
        tmName: [
            // trigger用户操作行为：blur失去焦点、change文本改变
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            // { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'change' }
            // 使用自定义验证规则 
            { validator: validateTmName, trigger: 'change' }
          ],
        logoUrl: [
          { required: true, message: '请选择LOGO图片'}  
        ]
      }
    }
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // 获得列表数据方法
    async getPageList(pager = 1) {
      // 修改分页器页数
      this.page = pager;
      const { page, limit } = this;
      const result = await this.$API.trademark.reqTradeMarkList(page, limit);
      console.log(result);
      if (result.code == 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    // 每页显示的条数发生变化
    handleSizeChange(pageSize){
      this.limit = pageSize
      this.getPageList()
    },
    // 点击添加，Dialog显示
    showDialog(){
      // 显示对话框
      this.dialogFormVisible = true
      this.tmForm = {
        tmName:'',
        logoUrl:''
      }
    },
    // 点击修改，Dialog显示，并处理逻辑。修改某一个品牌
    updateTradeMark(row){
      this.dialogFormVisible = true
      // 将服务器返回品牌的信息，直接赋值给tmForm进行展示
      // 浅拷贝，点击修改后就算取消也不会修改列表内的元素内容
      this.tmForm = {...row}
    },
    // 上传图片相关的回调
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      // res 上传成功之后返回前端数据   file 上传成功之后返回前端数据
      // 收集品牌图片数据，将来要带给服务器
        this.tmForm.logoUrl = res.data
      },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 添加按钮（添加或修改）
    addOrUpdateTradeMark(){
      // 当全部验证字段通过，再去书写业务逻辑。只有通过全部验证，确认按钮才能发送请求
      this.$refs.ruleForm.validate(async (success) => {
        if(success){
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
          console.log(result)
          if(result.code == 200){
            // 弹出消息
            this.$message({
              type:'success',
              message:this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
            })
            // 添加或修改后重新获取列表
            // 添加品牌，停留在第一页，修改品牌停留在当前页
            this.getPageList(this.tmForm.id ? this.page : 1)
          }
        }
      })
      
    },
    // 删除
    deleteTradeMark(row){
      // 弹框
      this.$confirm(`将永久删除${row.tmName}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 用户点击确定按钮就会触发
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id)
          console.log(result,row.id)
          if(result.code == 200){
            console.log('ok')
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 再次获得品牌数据
            this.getPageList(this.list.length < 1 ? this.page - 1 : this.page);
          }
        }).catch(() => {
          // 点击取消按钮触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>