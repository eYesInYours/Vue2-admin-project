<template>
  <el-card>
    <div class="prop_header">
      <span>销售额类别占比</span>
      <el-radio-group size="small" v-model="selectValue">
        <el-radio-button label="全部渠道"></el-radio-button>
        <el-radio-button label="线上"></el-radio-button>
        <el-radio-button label="门店"></el-radio-button>
      </el-radio-group>
    </div>
    <div class="prop_content">
      <div ref="bar" class="bar"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {
      selectValue: "全部渠道",
    };
  },
  mounted() {
    let myEcharts = echarts.init(this.$refs.bar);
    myEcharts.setOption({
      title:{
            text:'搜索引擎',
            subtext:'1048',
            left:'center',
            top:'center'
          },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          // 外字体放大
          /* emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          }, */
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
    // 鼠标hover事件
    myEcharts.on('mouseover', function (params) {
      // 获取鼠标hover的数据
      const {value , name} = params.data
      myEcharts.setOption({
        title:{
          text:name,
          subtext:value
        }
      })
    });
  },
};
</script>

<style scoped>
.prop_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1px 0 6px 0;
}
.prop_content{
  width:100%;
  height:260px;
}
.bar {
  width: 100%;
  height: 100%;
}
</style>