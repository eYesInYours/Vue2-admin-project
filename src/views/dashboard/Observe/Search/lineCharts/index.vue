<template>
  <div class="chartLine" ref="chartLine"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "",
  props:['flag'],
  mounted() {
    let myEcharts = echarts.init(this.$refs.chartLine);

    myEcharts.setOption({
      xAxis: {
        type: "category",
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: this.flag == 1 ? [11, 33, 26, 34, 41,22,26] : [14, 30, 28, 34, 8,18,20],
          smooth: true,
          itemStyle: {
            opacity: 0,
          },
          lineStyle: {
            color: "pink",
          },
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
                  color: "pink", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
      grid:{
        left:-13,
        top:0,
        right:0,
        bottom:0
      }
    });
  },
};

</script>

<style>
.chartLine {
  width: 100%;
  height: 100%;
}
</style>