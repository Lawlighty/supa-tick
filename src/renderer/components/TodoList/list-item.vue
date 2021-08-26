<template>
  <div class="item">
    <el-tag
        :type="ItemType"
        closable
        @close="closeCurrentTag"
        effect="dark">
        {{ objData.name }}
      </el-tag>
   
  </div>
</template>

<script>
import _ from 'lodash'

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
      console.log('ItemType',)
    }
  },
  computed:{
    ItemType(){
      return this.ItemTypeIn[this.type]
    }
  },
  methods: {
    closeCurrentTag() {
      this.$confirm('是否删除该任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let type = this.findKey(this.ItemType)
          this.$emit('closeTag',{type: type, item: this.objData})
        }).catch(() => {     
        });
    },
    findKey : function(value, compare = (a, b) => a === b){
      return Object.keys(this.ItemTypeIn).find(k => compare(this.ItemTypeIn[k], value))
    }
  },
}
</script>

<style scoped>
.item{
  cursor: pointer;
  margin-right: 20px;
}
</style>