<template>
    <header>
        <mt-header title="" class="header" fixed >
            <div slot="left">
                <router-link to="/" >
                    <img class="logo" src="../assets/image/logo.png" alt="">
                </router-link>
                <span class="downBtn" @click="downApp">下载酷狗</span>
            </div>
            <div slot="right" @click="search">
                <router-link to="/search">
                    <img class="search" src="../assets/image/search.png" alt="">
                </router-link>
            </div>
        </mt-header>
    </header>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    methods:{
        search(){
            if(this.$store.state.LyricsIsShow){
                this.$store.commit("changeLyricsIsShow",{bl:false});
            }
        },
        downApp(){
             MessageBox({
                title: '提示',
                message: '暂不支持',
                showCancelButton: true,
                cancelButtonText:"取消",
                showConfirmButton:false
            });
        }
    }
}
</script>

<style lang="less" scoped>
    header{
        height: 1.02rem;
        background: #2ca2f9;
    }
    .header{
        .logo{
            width: 2.28rem;
            margin-right: 0.31rem;
        }
        .downBtn{
            display: inline-block;
            text-align: center;
            line-height: .53rem;
            width: 1.78rem;
            height: 0.53rem;
            border: 1px solid #77c3fc;
            border-radius: 4px;
        }
        .search{
            width: 0.38rem;
        }
    }
</style>
