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
        // 均分
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [10, 7, 15, 22, 4, 17, 8],
          // 拐点样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条样式
          lineStyle: {
            color: "purple",
          },
          // 填充颜色
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          // 圆润弧度
          smooth:true
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
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