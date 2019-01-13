<template>
    <div class="searchbar" :style="{'padding-bottom':$store.state.playInfo.songList.length>0?'1.5rem':'0'}">
      <mt-header title="搜索" class="searchbox">
        <div @click="$router.history.go(-1)" slot="left">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <input type="text" class="input" v-model="msg" placeholder="歌手/歌名/拼音" ref="input">
      <mt-button size="small"  @click.native="clicksearch">搜索</mt-button>
      <div v-if="hideList">
        <div class="hotTitle">
          最近热门
        </div>
        <ul :style="{'padding-bottom':$store.state.playInfo.songList.length>0?'1.5rem':'0'}">
          <li 
          v-for="(item,index) in hotList"
          :key="index"
          @click="clickHotTitle"
          >{{item.keyword}}</li>
        </ul>
      </div>
      <div v-else v-cloak class="haveData">共有{{songInfo.length}}条结果</div>
      <one :songInfo="songInfo"/>
    </div>
</template>

<script>
import one from "./search/one"
export default {
  data(){
    return {
      hotList:[],
      msg:"",
      songInfo:[],
      hideList:true
    }
  },
  methods:{
    clickHotTitle(e){
      this.msg=e.target.innerHTML;
      this.hideList=false;
      this.$jsonp(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${this.msg}&page=1&pagesize=30&showtype=1`,null,(err,data)=>{
      if(!err){
        this.songInfo = data.data.info
        }
      })
    },
    clicksearch(e){
      if(!this.$refs.input.value==""){
        this.msg=this.$refs.input.value
        this.hideList=false;
        this.$jsonp(`http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${this.msg}&page=1&pagesize=30&showtype=1`,null,(err,data)=>{
        if(!err){
          this.songInfo = data.data.info
          }
        })
      }else{
        return false
      }
    }
  },
  components:{
    one
  },
  // 最近热门列表
  // http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30&callback=kgJSONP878272698
  // 搜索
  // http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=${关键词}&page=1&pagesize=30&showtype=1&callback=kgJSONP903633317
  created(){
     this.$jsonp("http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30",null,(err,data)=>{
       if(!err){
        //  最近热门列表
         this.hotList=data.data.info
       }
     })
  } 
}
</script>

<style lang="less" scoped>
.searchbar{
  position: fixed;
  top:1.02rem;
  right:0;
  left:0;
  bottom:0;
  z-index: 10;
  background-color: #fff;
  overflow-y: auto;
}
[v-cloak] {
  display: none;
}
.searchbar .searchbox{ 
  background: #FFF; 
  color: #333;
  box-shadow: 0 0.1rem 0.1rem 0 #f4f4f4;

}
.searchbar .input{
  width: 5.47rem;
  height: 0.65rem;
  border:1px solid #dfdfdf;
  border-radius: 0.08rem;
  margin: 0 0.23rem 0 0.23rem;
  outline: none;
  padding-left:0.1rem;
  font-size:0.35rem;
  color:#50565d;
}
.searchbar .hotTitle{
  font:0.27rem/0.97rem "宋体";
  color:#1499f4;
  padding-left:0.29rem;
  border-bottom: 0.01rem solid #c8c8c8;
  padding-top:0.24rem;
}
.searchbar ul{
  padding: 0;
  margin: 0;
  list-style: none;
  li{
    height: 1.18rem;
    margin-left:0.23rem;
    font-size:0.38rem;
    line-height: 1.18rem;
    border-bottom: 1px solid #e6e6e6;
    color:#404a52;
  }
}
.searchbar .haveData{
  font:0.27rem/0.51rem "宋体";
  color:#404d58;
  background-color: #e6e6e6;
  padding-left:0.31rem;
  margin-top:0.31rem;
}
</style>
