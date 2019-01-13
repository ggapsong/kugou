<template>
    <div class="footer" v-show="list.length>0">
        <div class="left" @click="LyricsShow">
            <img class="song-pic" :src="songData.imgUrl | imgUrl" alt="">
            <div class="song-info">
                <div class="song-name">{{songData.songName}}</div>
                <div class="songer">{{songData.singerName}}</div>
            </div>
        </div>
        <div class="right">
            <img src="../assets/image/play.png" v-if="!playing" alt="" @click="play">
            <img src="../assets/image/stop.png" v-else alt="" @click="stop" >
            <img src="../assets/image/next.png" alt="" @click="changeNextSong">
            <img 
                src="../assets/image/down.png" 
                alt="" 
                @click="downLoad"
            >
        </div>
        <audio 
            v-show="false"
            preload
            :src="songData.url"
            ref="audio"
        ></audio>
        <baseLyrics 
            v-if="LyricsIsShow" 
            :ric="ric" 
            :songData="songData" 
            :playing="playing" 
            :stop="stop"
            :play="play"
            :duration="duration"
            :currentTime="currentTime"
            :changeNextSong="changeNextSong"
            :changePrevSong="changePrevSong"
            @dragTime="changePlayTime"
        />
    </div>
</template>

<script>
import {MessageBox} from 'mint-ui';
import baseLyrics from "@/components/LyricsShow/baseLyrics"
export default {
    data(){
        return {
            //歌曲信息
            songData:{},
            playing:false,
            //歌词信息
            ric:"",
            //总时间
            duration:"",
            currentTime:"",
        }
    },
    mounted(){
        //监控播放位置发生变化
        this.$refs.audio.addEventListener('timeupdate',()=>{
            this.currentTime=this.$refs.audio.currentTime;
        });
        this.$refs.audio.addEventListener("ended",()=>{
            this.changeNextSong()
        });
        //获取音频时间
        this.$refs.audio.addEventListener('loadeddata',()=>{
            //获取音频总时间
            this.duration=this.$refs.audio.duration;
        })
    },
    beforeDestroy(){

    },
    components:{
        baseLyrics,
        // downLoad
    },
    methods:{
        //播放
        play(){
            this.$refs.audio.play();
            this.playing = true;
        },//暂停
        stop(){
            this.$refs.audio.pause(); 
            this.playing = false;
        },
        //请求歌词数据
        LyricsShow(){
            this.$store.commit("changeLyricsIsShow",{bl:true});
        },
        //下一首歌曲
        changeNextSong(){
            this.$store.commit('nextSong');
        },
        //上一首歌曲
        changePrevSong(){
            this.$store.commit("prevSong")
        },
        changePlayTime(t){
            this.$refs.audio.currentTime = t
        },
        downLoad(){
            MessageBox({
                title: '提示',
                message: '下载需要手机酷狗客户端支持。',
                showCancelButton: true,
                cancelButtonText:"取消",
                showConfirmButton:false
            });
        }

    },
    computed:{
        index(){
            return this.$store.state.playInfo.index;
        },
        list(){
            return this.$store.state.playInfo.songList;
        },
        playInfo(){
            return this.$store.state.playInfo;
        },
        LyricsIsShow(){
            return this.$store.state.LyricsIsShow;
        }
    },
    watch:{
        "$store.state.playInfo":{
            handler(){
                if(this.list.length<=0){
                    return false;
                }
                this.$ajax({
                    url:"/api/app/i/getSongInfo.php?cmd=playInfo&hash="+this.list[this.index].hash
                }).then((data)=>{
                    if(data.data.error){
                        MessageBox.alert(data.data.error, "提示");
                        return false;
                    }
                    this.songData = data.data;
                    this.$nextTick(()=>{
                        this.$refs.audio.load();
                        this.play();
                        
                    })

                })
                this.$ajax({
                    url:'/api/app/i/krc.php',
                    params:{
                        cmd:100,
                        hash:this.$store.getters.now.hash,
                        timelength:1
                    }
                }).then((data)=>{
                    this.ric=data.data;
                }).catch((err)=>{
                    console.log(err);
                });
            },
            deep:true
        },
    }
}
</script>

<style lang="less" scoped>
.footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height:1.5rem;
    background-color: #191919;
    z-index: 11;
    :after{
        clear: both;
        display: block;
        content: ""
    }
    .left{
        float: left;
         .song-pic{
            width: 1.5rem;
            float: left;
        }
        .song-info{
            font:0.3rem/0.4rem "宋体";
            color:#fcfcfc;
            float: right;
            margin:0.32rem;
            width: 2.7rem;
               
            .song-name{  
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis; 

            }
            .songer{
                color:#7e7e7e;
                margin-top:0.1rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis; 
            }
        }
    }
    .right{
        float: right;
        margin-top:0.5rem;
        img{
            height: 0.4rem;
            margin-right:0.40rem;
        }
        .play{
            
        }
    }
   .Mask{
       position: absolute;
       right: 0;
       left:0;
       top:0;
       bottom:0;
   }
}
</style>
