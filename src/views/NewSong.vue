<template>
    <div>
        <div class="wrap">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in banner" :key="item.id" >
                    <img :src="item.imgurl" alt="" class="img">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div>
            <SongItem 
                v-for="(item,index) in list" 
                :key="index"
                :fileName="item.filename"
                :hash="item.hash"
                :info="item"
                @clickItem="chan(index)"
            />
        </div>
    </div>
</template>

<script>
import SongItem from '../components/SongItem'
export default {
    components:{
        SongItem
    },
    data(){
        return{
            banner:[],
            list:[],
            songList:this.$store.state.songList
        }
    },
    methods:{
        chan(index){
            this.$store.commit('changeSongList',{songList:this.list,index})
        }
    },
    created(){
        this.$ajax('/api?json=true').then(({data})=>{
            this.banner = data.banner;
            this.list = data.data;
            this.songList=data.data;
        });
    },
}
</script>

<style lang="less" scoped>
.wrap{
    height: 2.84rem;
    margin-top: 0.1rem;
    .img{
        height:2.84rem;
        display: block;
        margin: 0 auto;
    }
}
// 新歌页面
</style>
