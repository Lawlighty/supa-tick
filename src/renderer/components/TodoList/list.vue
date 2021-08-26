<template>
  <div class="list" >

      <el-card class="box-card" v-for="(item, index) in listData" :key="index">
        <div slot="header" class="clearfix">
            <span>{{item.title}}</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        </div>
        <draggable class="draggable" :list="item.list" group="people" :empty-insert-threshold="500">
            <transition-group>
                <div class="draggable-item" v-for="element in item.list" :key="element.id">
                <list-item :objData="element" :type="item.type"></list-item>
                </div>
            </transition-group>
        </draggable>
      </el-card>
    <!-- <div class="list-group" v-for="(item, index) in listData" :key="index">
        <div class="list-title">{{item.title}}</div>
        <draggable class="draggable" :list="item.list" group="people" :empty-insert-threshold="500">
        <transition-group>
            <div class="draggable-item" v-for="element in item.list" :key="element.id">
            <list-item :objData="element" :type="item.type"></list-item>
            </div>
        </transition-group>
        </draggable>
    </div> -->
  </div>
</template>

<script>
import ListItem from './list-item'
import Draggable from 'vuedraggable'

export default {
  props: {
    listData: {
      type: [Array],
      default: () => []
    }
  },
  components: {
    ListItem,
    Draggable
  }
}
</script>

<style >
.list{
  height: 100%;
  background-color: #f5f5f5;
  padding: 20px;
  display: flex;
}
.box-card{
    flex: 1;
    min-width: 240px;
    height: 100%;
    margin-right: 20px;
}
.list-group{
    float: left;
    width: 240px;
    height: 100%;
    margin-right: 20px;
}
.list-title{
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
}
.draggable{
  min-height: calc(100vh - 120px);
}
.draggable-item{
  margin-bottom: 8px;
}
        
</style>