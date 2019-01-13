<template>
    <div class="rankWrap">
        <mt-cell 
            :title="item.rankname" 
            v-for="item in list"
            :key="item.id"
            class="rankInfo"
            @click.native="getRankList(item)"
        >
            <img slot="icon" :src="item.imgurl | imgUrl" width="24" height="24"
            class="img"
            >
        </mt-cell>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    methods:{
        getRankList(item){
            this.$router.push({
                name:"rankinfo",
                params:{
                    id:item.rankid
                }
            })
            this.$store.commit("changeActiveTitle",item.rankname)
        }
    },
    created(){
        this.$ajax("/api/rank/list?json=true").then(({data})=>{
            this.list = data.rank.list
        })
    }
}
</script>

<style scoped>
.rankInfo{
    border-bottom:1px solid #e2e2e2;
    margin-top: 0.1rem;
}
.img{
    width: 1.8rem;
    height: 1.8rem;
    padding: 0.22rem 0;
}
</style>
