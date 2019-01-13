<template>
    <div class="rankInfoWrap">
        <comHead />
        <div>
            <img :src="info.imgurl | imgUrl" alt="" class="img">
        </div>
        <SongItem
            v-for="(item,index) in list"
            :key="item.id"
            :hash="item.hash"
            :fileName="item.filename"
            :info="item"
            @clickItem="clickItem(index)"
            :rankNum="rankNum"
            :index="index"
        />   
    </div>
</template>

<script>
import comHead from "../../components/comHead"
import SongItem from "../../components/SongItem"
export default {
    components:{
        SongItem,
        comHead
    },
    data(){
        return{
            list:[],
            info:"",
            rankNum:true,
            num:[]
        }
    },
    created(){
        this.$ajax(`/api/rank/info/${this.$route.params.id}?json=true`).then(({data})=>{
            this.list = data.songs.list;
            this.info = data.info;
        })
    },
    methods:{
        clickItem(index){
            this.$store.commit('changeSongList',{songList:this.list,index})
        },
    },
}
</script>

<style scoped>
.rankInfoWrap{
    width: 100%;
    overflow: hidden;
}
   
.rankInfoWrap .img{
    width:7.50rem;
    height: 5rem;
}
</style>
