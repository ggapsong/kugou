<template>
    <div class="wraps">
        <mt-cell
            v-for="item in list"
            :key="item.classid"
            :title="item.classname"
            is-link
            class="list"
            @click.native="goSingerList(item)"
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
        goSingerList(item){
            this.$router.push({
                name:"singerlist",
                params:{
                    id:item.classid
                }
            })
            this.$store.commit("changeActiveTitle",item.classname)
        }
    },
    created(){
        this.$ajax('/api/singer/class?json=true').then(({data})=>{
            this.list = data.list
        });
    }
   
}
</script>

<style>
.wraps .list{
    margin-top:0.08rem;
    border:1px solid #CCC;
    border-radius: 5px;
    margin: 0.2rem;
}
</style>
