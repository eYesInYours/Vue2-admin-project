<template>
  <el-card>
    <div class="search-header">
      <span>线上热门搜索</span>
      
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="search-content">
      <div class="content">
        <div class="content-header">
          <span>搜索用户数</span>
          <svg
            t="1660394604647"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2294"
            width="16"
            height="16"
          >
            <path
              d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z"
              p-id="2295"
            ></path>
            <path
              d="M549.546667 641.706667l-29.582223 15.928889c2.275556-12.515556 14.791111-62.577778 35.271112-152.462223 2.275556-9.102222 4.551111-36.408889-15.928889-47.786666-6.826667-3.413333-14.791111-3.413333-22.755556 0-9.102222 3.413333-17.066667 7.964444-23.893333 12.515555-4.551111 3.413333-25.031111 18.204444-60.302222 44.373334-6.826667 5.688889-9.102222 14.791111-4.551112 22.755555s13.653333 10.24 20.48 5.688889l34.133334-20.48-35.271111 150.186667c-3.413333 13.653333 1.137778 22.755556 7.964444 30.72 5.688889 6.826667 14.791111 11.377778 23.893333 11.377777 4.551111 0 7.964444-1.137778 11.377778-2.275555 6.826667-3.413333 31.857778-17.066667 76.231111-43.235556 7.964444-4.551111 11.377778-14.791111 5.688889-22.755555-3.413333-5.688889-13.653333-9.102222-22.755555-4.551111z"
              p-id="2296"
            ></path>
            <path
              d="M523.377778 364.088889m-45.511111 0a45.511111 45.511111 0 1 0 91.022222 0 45.511111 45.511111 0 1 0-91.022222 0Z"
              p-id="2297"
            ></path>
          </svg>
        </div>
        <div class="content-content">
          <span>12321</span>
          <span style="font-size: 14px; color: #9e9e9e">
            17.1
            <svg
              style="padding-top: 4px"
              t="1660529638215"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2481"
              width="16"
              height="16"
            >
              <path
                d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
                p-id="2482"
                fill="#d4237a"
              ></path>
            </svg>
          </span>
        </div>
        <lineCharts :flag="1"></lineCharts>
      </div>
      <div class="content">
        <div class="content-header">
          <span>人均搜索次数</span>
          <svg
            t="1660394604647"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2294"
            width="16"
            height="16"
          >
            <path
              d="M512 85.333333C276.48 85.333333 85.333333 276.48 85.333333 512S276.48 938.666667 512 938.666667 938.666667 747.52 938.666667 512 747.52 85.333333 512 85.333333z m0 796.444445c-203.662222 0-369.777778-166.115556-369.777778-369.777778S308.337778 142.222222 512 142.222222 881.777778 308.337778 881.777778 512 715.662222 881.777778 512 881.777778z"
              p-id="2295"
            ></path>
            <path
              d="M549.546667 641.706667l-29.582223 15.928889c2.275556-12.515556 14.791111-62.577778 35.271112-152.462223 2.275556-9.102222 4.551111-36.408889-15.928889-47.786666-6.826667-3.413333-14.791111-3.413333-22.755556 0-9.102222 3.413333-17.066667 7.964444-23.893333 12.515555-4.551111 3.413333-25.031111 18.204444-60.302222 44.373334-6.826667 5.688889-9.102222 14.791111-4.551112 22.755555s13.653333 10.24 20.48 5.688889l34.133334-20.48-35.271111 150.186667c-3.413333 13.653333 1.137778 22.755556 7.964444 30.72 5.688889 6.826667 14.791111 11.377778 23.893333 11.377777 4.551111 0 7.964444-1.137778 11.377778-2.275555 6.826667-3.413333 31.857778-17.066667 76.231111-43.235556 7.964444-4.551111 11.377778-14.791111 5.688889-22.755555-3.413333-5.688889-13.653333-9.102222-22.755555-4.551111z"
              p-id="2296"
            ></path>
            <path
              d="M523.377778 364.088889m-45.511111 0a45.511111 45.511111 0 1 0 91.022222 0 45.511111 45.511111 0 1 0-91.022222 0Z"
              p-id="2297"
            ></path>
          </svg>
        </div>
        <div class="content-content">
          <span>2.7</span>
          <span style="font-size: 14px; color: #9e9e9e">
            26.2
            <svg
              style="padding-top: 4px"
              t="1660530610062"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3694"
              width="16"
              height="16"
            >
              <path
                d="M941.808046 195.931415 512 828.068585 82.191954 195.931415Z"
                p-id="3695"
                fill="#d4237a"
              ></path>
            </svg>
          </span>
        </div>
        <lineCharts style="width: 100%; height: 50%" :flag="2"></lineCharts>
      </div>
    </div>
    <div class="search-footer">
      <el-table border size="mini">
        <el-table-column label="排名" type="index"></el-table-column>
        <el-table-column label="搜索关键字"></el-table-column>
        <el-table-column label="用户数" sortable></el-table-column>
        <el-table-column label="周涨幅" sortable></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="100"
        style="float: right; margin: 8px 0"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import lineCharts from "./lineCharts";
export default {
  name: "",
  components: {
    lineCharts,
  },
};
</script>

<style scoped>
.search-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding: 5px 0 15px 0;
}
.content {
  width: 50%;
}
.search-content {
  display: flex;
  justify-content: space-between;
}
.content > .content-header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-top: 15px;
}
.content > .content-header span {
  margin-right: 8px;
  color: rgb(161, 159, 159);
  font-size: 14px;
}
.content > .content-content {
  margin-top: 10px;
}
.content > .content-content span {
  display: inline-block;
  font-size: 18px;
  margin-right: 14px;
}
</style>