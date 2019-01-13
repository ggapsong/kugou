<template>
    <div class="listInfoWrap">
        <comHead />
        <div>
            <img :src="info.imgurl | imgUrl" alt="" class="img">
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
            info:""
        }
    },
    created(){
        this.$ajax(`/api/plist/list/${this.$route.params.id}?json=true`)
        .then(({data})=>{ 
            this.list = data.list.list.info
            this.info = data.info.list
        })
    },
    methods:{
        clickItem(index){
            this.$store.commit('changeSongList',{songList:this.list,index})
        }
    }
    
}
</script>

<style scoped>
.listInfoWrap{
    width: 100%;
    overflow: hidden;
    /* margin-top:0.1rem; */
}
   
.listInfoWrap .img{
    width:7.50rem;
    height: 5rem;
}
</style>
