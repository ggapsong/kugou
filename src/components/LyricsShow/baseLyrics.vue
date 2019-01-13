<template>
   <div class="mark" @touchmove.prevent>
        <div class="lyrics" ref="lyrics" :isShow="isShow" >
            <div class="blur_bg" :style="{'background-image':'url('+imgUrl+')'}">
            </div>
            <mt-header :title="songData.songName" class="back">
                <div slot="left" @click="backPrev" class="back_btn">
                    <mt-button icon="back"></mt-button>
                </div>
            </mt-header>
            <Lyrics :ric="ric" :currentT="currentTime"/>
            <Control 
                :playing="playing"
                :stop="stop"
                :play="play"
                :duration="duration"
                :currentTime="currentTime"
                :changeNextSong="changeNextSong"
                :changePrevSong="changePrevSong"
                @dragTime="(t)=>{$emit('dragTime',t)}"
            />
        </div>
   </div>
</template>

<script>
import Lyrics from "./Lyrics"
import Control from "./Control"
export default {
    props:["isShow","ric","songData","playing","stop","play","duration","currentTime","changeNextSong","changePrevSong",],
    data(){
        return{
            
        }
    },
    created(){
    },
    mounted(){
    },
    methods:{
        backPrev(){
            this.$store.commit("changeLyricsIsShow",{bl:false})
        },
    },
    components:{
        Lyrics,
        Control
    },
    computed:{
        imgUrl(){
            return this.songData.imgUrl.replace("{size}",240)
        }
    }
}
</script>

<style lang="less" scoped>
// .mark{
//     position: fixed;
//     top: 0;
//     left: 0;
//     right:0;
//     bottom: 0;
// }
.lyrics{
    /* display: none; */
    background-color:#ccc;
    position: fixed;
    top: 1.02rem;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    .back{
        background:rgba(0,0,0,0);
        .back_icon{
        }
        .back_btn{

        }
    }
        //背景模糊
    .blur_bg{
        position: absolute;
        top:0;
        right:0;
        left:0;
        bottom:0;
        background: url(http://m.kugou.com/v3/static/images/index/logo_kugou.png) no-repeat center center;
        background-position: center center;
        background-size: cover;
        -webkit-filter: blur(15px);
        filter: blur(15px);
    }
}
</style>
