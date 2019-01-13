<template>
    <div class="wrap">
        <comHead />
        <mt-cell 
            v-for="item in list"
            :key="item.singerid"
            :title="item.singername"
            class="songlist"
            @click.native="getSingerInfo(item)"
        >
            <img slot="icon" :src="item.imgurl |imgUrl">
        </mt-cell>
    </div>
</template>

<script>
import comHead from "../../components/comHead"
export default {
    data(){
        return{
            list:[],
        }
    },
    components:{
        comHead
    },
    methods:{
        getSingerInfo(item){
            this.$router.push({
                name:"singerinfo",
                params:{
                    id:item.singerid
                }
            })
            this.$store.commit("changeActiveTitle",item.singername)

        }
    },
    created(){
        this.$ajax(`/api/singer/list/${this.$route.params.id}?json=true`).then((data)=>{
            this.list=data.data.singers.list.info
        })
    },
}
</script>

<style scoped>
.wrap{
    margin-top:0.15rem;
}
.wrap .songlist{
    border-bottom:0.02rem solid #e4e4e4;
    padding: 0.21rem 0;
}
.wrap .songlist img{
    width: 1.09rem;
    padding-right:0.2rem;
}
</style>
