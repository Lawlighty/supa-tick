<template>

<div>
    <PcLayout>
      <template slot="current-main-page">
          <div id="wrapper">
            <main>
            <div class="my-timer">
                <a-progress
                :stroke-color="{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }"
                type="circle"
                :percent="percent"
                :format="() => this.currenttimer"
                />

                <div class="my-btn">
                <template v-if="target == 0">
                    <div>
                    <a-button
                        type="primary"
                        style="margin-right: 10px"
                        @click="startTimer('work')"
                    >
                        开始工作
                    </a-button>
                    <a-button type="dashed" @click="startTimer('rest')">
                        开始休息
                    </a-button>
                    </div>
                </template>
                <div v-if="target == 1">
                    <a-popconfirm
                    title="确定停止工作吗?"
                    ok-text="是的"
                    cancel-text="取消"
                    @confirm="confirm"
                    @cancel="cancel"
                    >
                    <a-button type="danger"> 结束工作 </a-button>
                    </a-popconfirm>
                </div>

                <div v-if="target == 2">
                    <a-popconfirm
                    title="确定停止休息吗?"
                    ok-text="是的"
                    cancel-text="取消"
                    @confirm="confirm"
                    @cancel="cancel"
                    >
                    <a-button type="danger"> 结束休息 </a-button>
                    </a-popconfirm>
                </div>
                </div>
            </div>
            </main>
        </div>
        <div class="container-right">
          <el-form ref="form" :model="form" label-width="120px" class="input-tick">
            <el-form-item label="任务时间（分）">
              <el-select
                :value="form.task"
                @change="changeTask"
                filterable
                allow-create
                default-first-option
                placeholder="请选择文章标签">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="休息时间（分）">
              <el-select
                  :value="form.rest"
                  @change="changeRest"
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请选择文章标签">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="!!target" type="primary" @click="onSubmit">应用</el-button>
              <el-button :disabled="!!target" @click="initick">初始化</el-button>
            </el-form-item>
          </el-form>
          <el-image src="/static/gifs/dota2.gif">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        
      </template>
    </PcLayout>
  </div>
  
</template>

<script>
const { ipcRenderer } = require("electron");
const Timer = require("timer.js");
import PcLayout from '../LayoutPage/PcLayout';

export default {
  name: "pomodoro-page",
  components: {
      PcLayout,
  },
  data() {
    return {
      target: 0, // 状态: 0 未开始 1 工作  2 休息
      workTime: 100, // 工作时间
      restTime: 30, //休息时间
      currenttimer: 0, // 显示的时间
      percent: 0, // 百分比
      workTimer: null,

      defaultTask: 15,
      defaultRest: 15,

      form:{
        task:15,
        rest: 15
      },
      options: [{
        value: 15,
        label: 15
      }, {
        value: 20,
        label: 20
      }, {
        value: 30,
        label: 30
      }, {
        value: 45,
        label: 45
      }, {
        value: 60,
        label: 60
      }],
    };
  },
  beforeDestroy(){
    if(this.workTimer){
      this.workTimer.stop();
    }
    this.workTimer = null;
  },
  mounted() {
    // this.startWork();
    this.workTime =  this.form.task * 60;
    this.restTime =  this.form.rest * 60;
  },
  methods: {
    startTimer(type = "work") {
      if (type == "work") {
        this.target = 1;
      } else {
        this.target = 2;
      }
      this.workTimer = new Timer({
        ontick: (ms) => {
          this.updateTime(ms, type);
        },
        onend: () => {
          this.percent = type === "work" ? this.workTime : this.restTime;
          this.calTimer(type === "work" ? this.workTime : this.restTime, type);
          this.notifiction();
          if (type === "work") {
            this.showConfirm();
          } else {
            this.showRestConfirm();
          }
        },
      });
      this.workTimer.start(type === "work" ? this.workTime : this.restTime);
    },
    updateTime(ms, type) {
      this.calTimer(ms, type);
    },
    async notifiction() {
      // let res = await ipcRenderer.invoke("work-notification");
      let res = ipcRenderer.send("work-notification");
    },
    calTimer(ms, type) {
      let s = (ms / 1000).toFixed(0);
      let ss = s % 60;
      let mm = (s / 60).toFixed(0);
      if (type === "work") {
        this.percent = Math.floor(((this.workTime - s) / this.workTime) * 100);
      } else {
        this.percent = Math.floor(((this.restTime - s) / this.restTime) * 100);
      }
      console.log('ms',ms)
      console.log('mm',mm)
      console.log('ss',ss)

      this.currenttimer = `${(mm).toString().padStart(2, 0)}:${ss
        .toString()
        .padStart(2, 0)}`;
    },
    showConfirm() {
      let _this = this;
      this.$confirm({
        title: "番茄任务执行完毕",
        content: "选择休息或者继续任务!",
        okText: "休息",
        cancelText: "继续任务",
        onOk() {
          _this.startTimer("rest");
        },
        onCancel() {
          // _this.startTimer("work");
        },
      });
    },

    showRestConfirm() {
      let _this = this;
      this.$confirm({
        title: "休息完毕",
        content: "选择开始工作或者继续休息!",
        okText: "开始工作",
        cancelText: "休息",
        onOk() {
          _this.startTimer("work");
        },
        onCancel() {
          // _this.startTimer("rest");
        },
      });
    },
    confirm(e) {
      if (this.workTimer) {
        this.workTimer.stop();
        this.target = 0;
        this.currenttimer = 0; // 显示的时间
        this.percent = 0; // 百分比
      }
      this.$message.success("取消工作");
    },
    cancel(e) {
      this.$message.error("点击取消");
    },

    onSubmit(){
      if(!this.form.task || !this.form.task * 1){
        this.form.task = this.defaultTask;
      }
      if(!this.form.rest || !this.form.rest * 1){
        this.form.rest = this.defaultRest;
      }
      this.workTime =  this.form.task * 60;
      this.restTime =  this.form.rest * 60;
    },

    initick(){
      console.log('initick')
      console.log('this.form',this.form)
      if(!this.form.task || !this.form.task * 1){
        this.form.task = this.defaultTask;
      }
      if(!this.form.rest || !this.form.rest * 1){
        this.form.rest = this.defaultRest;
      }
      this.workTime =  this.form.task * 60;
      this.restTime =  this.form.rest * 60;
    },
    changeTask(e){
      this.form.task = e&&(e * 1)?e: this.defaultRest;
      this.workTime =  this.form.task * 60;
    },
    changeRest(e){
      this.form.rest = e&&(e * 1)?e: this.defaultRest;
      this.restTime =  this.form.rest * 60;
    }
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}
main {
  display: flex;
  justify-content: space-between;
}
.my-timer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.my-timer .ant-progress-circle .ant-progress-inner {
  width: 300px !important;
  height: 300px !important;
}
.my-timer .ant-progress-text {
  font-size: 46px;
  font-weight: bold;
}
.my-btn {
  margin-top: 20px;
}
main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
.input-tick{
  flex: 1;
  margin-left: 20px;
}
.container-right{
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
</style>
