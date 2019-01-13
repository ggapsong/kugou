<template>
    <div id="wrap">
        <comHead />
        <div class="infobox">
            <img :src="info.imgurl | imgUrl" alt="" class="img">
        </div>
        <div class="intro">
            <p class="info" ref="info" :style="{'height':showHei?'auto':'0.52rem'}">
                {{info.intro}}
            </p>
            <p class="icom" @click="seeAll">
                <img src="../../../assets/image/d.png" alt="" v-if="!showHei" />
                <img src="../../../assets/image/up.png" alt="" v-else />
            </p>
        </div>
        <SongItem
           v-for="(item,index) in list"
           :key="item.audio_id"
           :fileName="item.filename"
           :hash="item.hash"
           :info="item"
           @clickItem="clickItem(index)"
        />
       
    </div>
</template>

<script>
import comHead from "../../../components/comHead"
import SongItem from "../../../components/SongItem"
export default {
    components:{
        SongItem,
        comHead
    },
    data(){
        return{
            list:[],
            info:"",
            showHei:false
        }
    },
    methods:{
        seeAll(){
            this.showHei = !this.showHei;
        },
        clickItem(index){
            this.$store.commit('changeSongList',{songList:this.list,index})
        }
    },
    created(){
        this.$ajax(`/api/singer/info/${this.$route.params.id}?json=true`).then((data)=>{
            this.list=data.data.songs.list
            this.info=data.data.info
        }).catch((err)=>{
            console.log(err)
        })
    }
}
</script>

<style lang="less" scoped>
#wrap .infobox{
    width: 100%;
    overflow: hidden;
}
#wrap .img{
    width:7.50rem;
    // margin-top:-2rem;
    height:5rem
}
#wrap .intro{
    overflow: hidden;
    font-size: 0.33rem;
    color:#1f2531;
    line-height: 0.52rem;
    box-shadow: 0 0.05rem 0.05rem 0 #f4f4f4;
    .info{
        height: 0.52rem;
        width: 6.2rem;
        float: left;
        margin-left:0.30rem;
        margin-top:0.22rem;
    }
    .icom{
        float: right;
        width: 0.81rem;
        img{
            width: 0.5rem;
            margin-top:0.2rem;
            margin-left:0.15rem;
        }
       
    }
}

</style>
