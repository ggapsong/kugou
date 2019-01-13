<template>
    <div class="LyricsWrap">
        <div class="LyricsWrapBox" :style="{'transform':'translate3d(0,-'+translateY+'rem,0)'}">
            <p 
                v-for="(item,index) in newRic"
                :key="index"
                :class="{'cur':activeIndex==index}"
            >
                {{item[1]}}
            </p>
        </div>
    </div>
</template>

<script>
import {parseLyric,sToM} from "@/utils/utils.js"
export default {
    props:["ric","currentT"],
    data(){
        return {
            activeIndex:0,
        }
    },
    computed:{
        newRic(){
            if(!this.ric){
                return [["0","暂无歌词"]]
            }
            return parseLyric(this.ric);
        },
        translateY(){
            let num = this.activeIndex-3;
            return num<0?0:num;
        }
    },
    watch:{
        currentT(n){
            for (let index = 0; index < this.newRic.length; index++) {
                if(n>= this.newRic[index][0]){
                    this.activeIndex = index;
                }else{
                    break;
                }
            };
        }
    }
}
</script>

<style lang="less" scoped>
    .LyricsWrap {
        position: relative;
        height: 67%;
        overflow: hidden;
        margin-top:0.6rem;
        z-index: 9;
        .LyricsWrapBox{
            position: absolute;
            width: 100%;
            transition: 0.5s;
        }
        p{
            text-align: center;
            line-height: 1rem;
            font-size: .3rem;
            color:#fff
        }
        .cur{
            color:red;
            font-size: 0.32rem;
        }
    }
</style>
