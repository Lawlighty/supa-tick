<template>
  <div>
    <PcLayout>
      <template slot="current-main-page">
          <template v-if="currentSrc">
              <a-card hoverable class="day-img">
                <img
                slot="cover"
                :src="currentSrc"
                alt="今日美图"
                style="width: 750px"
                />
                <a-card-meta >
                <template slot="description">
                    {{bingImgInfo.copyright}}
                </template>
                </a-card-meta>
            </a-card>
          </template>
          <template v-else>
              <a-skeleton active />
            </template>
          
      </template>
    </PcLayout>
  </div>
  
</template>

<script>
  import PcLayout from '../LayoutPage/PcLayout';

  export default {
    name: 'beautiful-soup-page',
    components: { 
      PcLayout,
    },
    data () {
      return {
          bingImgInfo: {}
      }
    },
    mounted(){
        this.getSoup();
    },
    computed:{
        currentSrc(){
            if (JSON.stringify(this.bingImgInfo).length>0){
                 return 'https://cn.bing.com/'+this.bingImgInfo.url
            }
            return ''
        }
    },
    methods: {
        async getSoup(){
            let res = await this.$http.get(
                `https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1`
            );
 
            if ( res&&res.request&&res.request.response){
                let a = JSON.parse(JSON.stringify(res.request.response));
                let b = JSON.parse(a);
                this.bingImgInfo = b.images[0]||{}
            }
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

.day-img{
    width: 750px;
    margin: 0 auto !important;
}
</style>
