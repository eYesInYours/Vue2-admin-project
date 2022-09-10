<template>
  <el-card style="margin: 10px 0">
    <div class="header">
      <!-- v-model="activeName" @tab-click="handleClick" -->
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
            style="width:220px;"
            v-model="date"
            value-format="yyyy-MM-dd"
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
      </div>
    </div>
    <div style="padding-top:25px">
        <el-row :gutter="10">
            <el-col :span="18">
                <div ref="echart" class="refEchart"></div>
            </el-col>
            <el-col :span="6">
                <div>
                    <h4>门店{{title}}排名</h4>
                    <ul>
                        <li>
                            <span class="rIndex">1</span>
                            <span>肯德基</span>
                            <span class="rValue">123,456</span>
                        </li>
                        <li>
                            <span class="rIndex">2</span>
                            <span>麦当劳</span>
                            <span class="rValue">231,233</span>
                        </li>
                        <li>
                            <span class="rIndex">3</span>
                            <span>肯德基</span>
                            <span class="rValue">432,422</span>
                        </li>
                        <li>
                            <span>4</span>
                            <span>海底捞</span>
                            <span class="rValue">534,322</span>
                        </li>
                        <li>
                            <span>5</span>
                            <span>西贝小面村</span>
                            <span class="rValue">123,155</span>
                        </li>
                        <li>
                            <span>6</span>
                            <span>汉堡王</span>
                            <span class="rValue">664,344</span>
                        </li>
                        <li>
                            <span>7</span>
                            <span>真功夫</span>
                            <span class="rValue">123,456</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
    name:'',
    data(){
        return {
            activeName:'first',
            myEcharts:null,
            // 销售额、访问量图表
            map1:[22,47,4,40,33,18,8,34,26,56,66,24],
            map2:[20,44,8,40,33,49,12,31,68,56,61,22],
            // 日期数据
            date:[]
        }
    },
    mounted(){
        this.myEcharts = echarts.init(this.$refs.echart)
        this.myEcharts.setOption({
            title:{
                text:'销售额趋势'
            },
            xAxis:{
                data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',]
            },
            yAxis:{},
            series:[
                {
                    type:'bar',
                    data:[22,47,4,40,33,18,8,34,26,56,66,24]
                }
            ],
            tooltip:{}
        })
    },
    computed:{
        title(){
            return this.activeName == 'first' ? '销售额' : '访问量'
        }
    },
    watch:{
        // title发生变化时，重新加载echarts，给图表改变标题
        title(){
            this.myEcharts.setOption({
                title:{
                    text:this.title+'趋势'
                },
                series:[
                    {
                        data: this.activeName == 'first' ? this.map1 : this.map2
                    }
                ]
            })
        }
    },
    methods:{
        setDay(){
            const day = dayjs().format('YYYY-MM-DD')
            this.date = [day,day]
        },
        setWeek(){
            const start = dayjs().day(1).format('YYYY-MM-DD')
            const end = dayjs().day(7).format('YYYY-MM-DD')
            this.date = [start, end]
        },
        setMonth(){
            const start = dayjs().startOf('month').format('YYYY-MM-DD')
            const end = dayjs().endOf('month').format('YYYY-MM-DD')
            this.date = [start, end]
        },
        setYear(){
            const start = dayjs().startOf('year').format('YYYY-MM-DD')
            const end = dayjs().endOf('year').format('YYYY-MM-DD')
            this.date = [start, end]
        }
    }
};
</script>

<style scoped>
.header{
    position:relative;
    display:flex;
    justify-content:space-between;
}
.right{
    position:absolute;
    right:0;
}
.right span{
    margin:0 8px;
    font-size:15px;
}
.tab{
    width:100%;
}
.refEchart{
    width:100%;
    height:380px;
}
ul{
    list-style:none;
    padding:0;
}
ul li{
    margin:25px 0;
}
ul li span{
    margin-right:16px;
}
.rIndex{
    display:inline-block;
    width:18px;
    height:18px;
    border-radius:50%;
    background-color:black;
    color:white;
    text-align: center;
    padding-top:0.8px;
    user-select:none;
}
.rValue{
    float:right;
}
</style>