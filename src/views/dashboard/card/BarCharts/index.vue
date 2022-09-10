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
          type: "bar",
          data: [10, 7, 15, 22, 4, 17, 8, 32],
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