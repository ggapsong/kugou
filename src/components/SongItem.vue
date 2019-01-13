<template>
<div class="wraps">
    <div class="wrapsBox">
        <div 
            class="song-item"
        >
            <div class="l" @click="pushSong">
                <div 
                    class="index" 
                    v-show="rankNum"
                    :style="styles"
                >{{index+1}}</div>
                <div class="filename">{{fileName}}</div>
            </div>
            <div class="r" @click="downLoad">
                <img src="../assets/image/download_icon_2.png" alt="">
            </div>
        </div>
    </div>
    
</div>
   
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    props: ['fileName','hash','info','showIndex',"rankNum","index"],
    data() {
        return {
            bgArr:['#e80000','#ff7200','#f8b300'],
            downTips:false,
        }
    },
    methods: {
        pushSong(item) {
            this.$emit('clickItem');
        },
        downLoad(){
            MessageBox({
                title: '提示',
                message: '下载需要手机酷狗客户端支持。',
                showCancelButton: true,
                cancelButtonText:"取消",
                showConfirmButton:false
            });
        },
        // cancelDown(){
        //     this.downTips = false
        // }
    },
    computed:{
        styles(){
            return {
                backgroundColor:this.bgArr[this.index],
                color:this.index<=2?"#fff":"#999"
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .song-item{
        font-size: 0.36rem;
        line-height: 0.4rem;
        display: flex;
        align-items: center;
        height: 1.4rem;
        margin-left: 0.2rem;
        padding-right: 0.2rem;
        border-bottom: 0.01rem solid #e5e5e5;
        .l{
            flex: 1;
            display: flex;
            align-items:center;
            .index{
                width: 0.46rem;
                height:0.4rem;
                line-height: 0.4rem;
                font-size: 0.12rem;
                text-align: center;
                margin-right: 0.1rem;
                border-radius: 0.12rem;
            }
            .filename{
                padding-left: 0.1rem;
                width: 6rem;
            }
        }
        .r{
            width: 1rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            img{
                width: 0.4rem;
                height: 0.34rem;
            }
        }
        .mask{
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            background:rgba(0,0,0,0.6);
            z-index:15;
            .downLoadAlert{
            position: fixed;
            width: 6.56rem;
            height: 2.73rem;
            border:1px solid #a5a5a5;
            border-radius: 0.2rem;
            padding-top:0.07rem;
            top:6rem;
            right:0;
            left:0;
            border:1px solid #ccc;
            background-color: #fff;
            margin: 0 auto;
            transition: 2s;
            .dialog-bd{
                p{  
                    font:0.32rem/1.54rem "宋体";
                    text-align: center;
                    border-bottom: 1px solid #e4e4e4;
                    color:#474747;
                }
            }
            .dialog-ft{
                span{
                    display: block;
                    font-size:0.29rem;
                    text-align: center;
                    line-height: 1.10rem;
                    color:#818181;
                }
            }
        }
        }
    }
</style>
