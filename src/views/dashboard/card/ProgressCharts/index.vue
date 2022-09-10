<template>
  <div ref="chart" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    const lineCharts = echarts.init(this.$refs.chart);
    lineCharts.setOption({
      xAxis: {
        show: false,
        // 设置最大值、最小值
        min:0,
        max:100
      },
      yAxis: {
        show: false,
        // 均分。横向
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          // 柱状图
          barWidth:12,
          color:'cyan',
          // 背景颜色设置
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          // 文本标签
          label:{
            show:true,
            // 内容
            formatter:'|',
            position:'right'
          }
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
      tooltip:{}
    });
  },
};
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
  /* border:1px solid black; */
}
</style>