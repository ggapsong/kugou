<template>
    <div class="wrap">
        <SongItem 
            v-for="(item,index) in songInfo"
            :key="index"
            :hash="item.hash"
            :fileName="item.filename"
            @clickItem="clickItem(index)"
        />
    </div>
    
</template>

<script>
import SongItem from "../../components/SongItem"
export default {
    props:["songInfo"],
    components:{
        SongItem
    },
    methods:{
        clickItem(index){
            this.$store.commit("changeSongList",{songList:this.songInfo,index})
        }
    }
}
</script>

<style>
/* .wrap{
    position: fixed;
    top:1.02rem;
    right:0;
    left:0;
    bottom:0;
    display: none;
    z-index: 1;
} */
</style>
