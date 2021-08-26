<!--  -->
<template>
    <div class='pc-layout'>
        <el-container class="pc-layout-container">
            <el-aside  class="pc-layout-aside">
                <el-menu :default-openeds="['1', '3']">
                <el-menu-item index="1">
                    <template slot="title"><i class="el-icon-notebook-2"></i>TODO</template>
                </el-menu-item>
                <el-menu-item index="2">
                    <template slot="title"><i class="el-icon-alarm-clock"></i>番茄钟</template>
                </el-menu-item>
                <el-menu-item index="3">
                    <template slot="title"><i class="el-icon-sunny"></i>每日一汤</template>
                </el-menu-item>
                </el-menu>
            </el-aside>
            
            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <img src="static/imgs/supa_chao.jpg" alt="supa-tick" class="left_top_logo">
                    <div class="placeholder-area"></div>
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>速啪超</span>
                </el-header>
                
                <el-main class="main-page">
                    <slot name="current-main-page"></slot>
                </el-main>
            </el-container>
            </el-container>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name: 'pc-layout',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    //方法集合
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style>
  .pc-layout-container{
    height: 100vh;
  }

  .pc-layout-aside{
    /* background: #001529; */
    width: 200px !important;
    background-color: rgb(238, 241, 246)
  }

  .el-header {
    background-color: #eccc68;
    color: #333;
    line-height: 60px;
    height: 60px;
    text-align: right;
    font-size: 12px;
    display: flex;
    padding:0 20px 0 0 !important;

  }
  
  .el-aside {
    color: #333;
  }

/* .pc-layout-aside .el-menu-item.is-active {
    color: #fff !important;
}

.pc-layout-aside .el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #1890ff !important;
} */
.el-menu{
  background: #001529;
}
.main-page{
  /* background: #B3C0D1; */
      background: #f5f5f5;
}
.left_top_logo{
  width: 60px;
  height: 60px;
}
.placeholder-area{
  flex: 1;
}
</style>