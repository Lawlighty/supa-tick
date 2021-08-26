<template>
  <div class="item">
    <el-tag
      :type="ItemType"
      effect="dark">
      {{ objData.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    objData: {
      type: [Object],
      default: () => {}
    },
    type: {
      type: String,
      default: 'todo',
    }
  },
  data(){
      return{
        ItemTypeIn:{
          'todo':'danger',
          'doing':'',
          'done':'success',
        }
      }
  },
  watch:{
    ItemType(v){
      console.log('ItemType',v)
    }
  },
  computed:{
    ItemType(){
      return this.ItemTypeIn[this.type]
    }
  }
}
</script>

<style scoped>
.item{
  cursor: pointer;
}
</style>