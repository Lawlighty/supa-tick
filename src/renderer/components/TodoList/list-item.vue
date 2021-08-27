<template>
  <div class="item">
     <a-popover title="Tips">
      <template slot="content">
        {{ objData.tips|| '暂无' }}
      </template>
      <el-tag
          :type="ItemType"
          closable
          @close="closeCurrentTag"
          effect="dark">
          {{ objData.name }}
        </el-tag>
    </a-popover>

    <a-modal
      title="Title"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确认删除"
      cancelText="取消"
    >
      <p>确定删除吗</p>
    </a-modal>
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
        },
        visible: false,
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
      this.visible = true;
      // this.$confirm('是否删除该任务?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     let type = this.findKey(this.ItemType)
      //     this.$emit('closeTag',{type: type, item: this.objData})
      //   }).catch(() => {     
      //   });
    },
    findKey : function(value, compare = (a, b) => a === b){
      return Object.keys(this.ItemTypeIn).find(k => compare(this.ItemTypeIn[k], value))
    },
    handleOk(){
      let type = this.findKey(this.ItemType)
      this.$emit('closeTag',{type: type, item: this.objData})
      this.visible = false;
    },
    handleCancel(){
      this.visible = false;
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