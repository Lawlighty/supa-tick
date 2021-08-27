<template>
  <div>
    <PcLayout>
      <template slot="current-main-page">
          <div class="input-area">
            <div>
              <a-input-search
                placeholder="写入任务"
                enter-button="添加"
                size="large"
                v-model="taskObj.name"
                @change="changeInputName"
                @search="onSearch"
              />
            </div>
            <div>
              <a-checkbox @change="onChange" :checked="showTip" style="padding: 10px 0">
                Tips
              </a-checkbox>
              <a-textarea v-if="showTip" placeholder="任务tips" :rows="4" v-model="taskObj.tips" @change="changeInputTips"/>
            </div>
            
          </div>
          
          <List :listData="todoData" @closeTag="closeTag"></List>
      </template>
    </PcLayout>
  </div>
  
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  import PcLayout from './LayoutPage/PcLayout';
  import List from './TodoList/list';

  export default {
    name: 'landing-page',
    components: { 
      SystemInformation,
      PcLayout,
      List,
    },
    data () {
      return {
        taskObj:{

        },
        showTip: false,
        todoData: [{
          title: '待处理',
          type:'todo',
          list: [
            // {
            //   id: 1,
            //   name: '测试1'
            // },
            // {
            //   id: 2,
            //   name: '测试2'
            // },
            // {
            //   id: 3,
            //   name: '测试3'
            // },
            // {
            //   id: 4,
            //   name: '测试4'
            // },
            //  {
            //   id: 5,
            //   name: '测试5'
            // }
          ]

          }, {
            title: '进行中',
            type:'doing',
            list: [
              // {
              //   id: 6,
              //   name: '测试6'
              // },
              // {
              //   id: 7,
              //   name: '测试7'
              // },
              // {
              //   id: 8,
              //   name: '测试8'
              // },
              // {
              //   id: 9,
              //   name: '测试9'
              // },
              // {
              //   id: 10,
              //   name: '测试10'
              // },
          ]
          }, {
            title: '已完成',
            type:'done',
             list: [
              // {
              //   id: 11,
              //   name: '测试11'
              // },
              // {
              //   id: 12,
              //   name: '测试12'
              // },
              // {
              //   id: 13,
              //   name: '测试13'
              // },
              // {
              //   id: 14,
              //   name: '测试14'
              // },
              // {
              //   id: 15,
              //   name: '测试15'
              // },
          ]
        }]
      }
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      localStorage.setItem('todoData',JSON.stringify(this.todoData))
    },
    methods: {
      init(){
        let localtodoData = localStorage.getItem('todoData');
        if(localtodoData){
          this.todoData = JSON.parse(localtodoData)
        }
      },
      changeInputName(e) {
        console.log('changeInputName',e);
        this.taskObj.name = e.target.value;
      },
      changeInputTips(e) {
        console.log('changeInputTips',e);
        this.taskObj.tips = e.target.value;
      },
        
      onSearch(value){
        let todoList = this.todoData[0].list;
        let nowtaskObj = {...this.taskObj};
        nowtaskObj['id'] = new Date().getTime()
        todoList.push(nowtaskObj);
        this.taskObj = {};
      },

      onChange(e){
        this.showTip = e.target.checked;
      },

      closeTag({type, item}){
        let newtodoData = JSON.parse(JSON.stringify(this.todoData));
        // 删除 任务项
        let ListIndex = newtodoData.findIndex((listItem)=>{
          return listItem.type === type
        })
        let itemIndex = newtodoData[ListIndex].list.findIndex((listItem)=>{
          return listItem.id === item.id
        })
        let todoList = newtodoData[ListIndex].list
        todoList.splice(itemIndex,1)
        newtodoData[ListIndex].list = todoList;
        this.todoData = newtodoData;
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    padding: 50px 80px;
    width: 100%;
    height: 100%;
  }
  .input-area{
    margin: 0 20px;
  }


</style>
