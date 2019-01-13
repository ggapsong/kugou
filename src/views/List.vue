<template>
    <div class="wrap">
        <ul class="list">
            <li 
                v-for="(item,i) in list"
                :key="i"
                :title="item.specialname"
                class="listInfo"
                @click="getListInfo(item)"
            >
                <div class="imgBox">
                    <img :src="item.imgurl | imgUrl" alt=""/>
                </div>
                <div class="infoBox">
                    <p class="specialname">{{item.specialname}}</p>
                    <p class="playcount">
                        <img src="../assets/image/headset.png" alt="">
                        {{item.playcount}}
                    </p>
                </div>
            </li>
        </ul>
        <!-- <mt-cell 
            v-for="(item,i) in list"
            :key="i"
            :title="item.specialname"
            class="listInfo"
            @click.native="getListInfo(item)"
        >
        <img slot="icon" :src="item.imgurl | imgUrl" class="img">
        </mt-cell> -->


        <!-- <div 
            v-for="(item,i) in list"
            :key="i"
            :title="item.specialname"
        >
        <div class="infoBox">
            <div class="listInfoName">{{item.specialname}}</div>
            <div>
                <img src="../assets/image/headset.png" alt="" class="headset">
                <span class="playcount">{{item.playcount}}</span>
            </div>
        </div>
        <div class="imgBox">
            <img :src="item.imgurl | imgUrl" alt="">
        </div>
        </div> -->
        
    </div>
</template>

<script>

export default {
    data(){
        return{
            list:[],
        }
    },
    methods:{
        getListInfo(item){
            this.$router.push({
                name:"listinfo",
                params:{
                    id:item.specialid
                }
            })
            this.$store.commit("changeActiveTitle",item.specialname)
        }
    },
    created(){
        this.$ajax("/api/plist/index?json=true").then(({data})=>{
            this.list = data.plist.list.info
        })
    }
}
</script>

<style lang="less" scoped>
.wrap{
    font-size: 0.34rem;
    color:#282c2b;
    font-family: "微软雅黑";
    line-height: 0.51rem;
    .list{
    }
    .listInfo{
        border-bottom: 1px solid #dcdcdc;
        // &:after{
        //     clear: both;
        //     content: "";
        //     display: block;    
        // }
        overflow: hidden;
        .imgBox{
            // display: inline-block;
            float: left;
            img{
                width: 1.80rem;
                margin: 0.23rem;
            }
        }
        .infoBox{
            // display: inline-block;
            width: 4.5rem;
            float: left;
            margin: 0.7rem 0 0 0.2rem;
            .specialname{

            }
            .playcount{
                font:0.22rem/0.36rem "微软雅黑";
                color: #959799;
                img{
                    width: 0.3rem;
                    display: inline-block;
                    padding-top:0.05rem;
                    margin-right: 0.05rem;
                }

            }
        }
    }
}




// .infoBox{
//     font:0.15rem/0.24rem "宋体";
//     color:#333333;
//     .listInfoName{
//         font-size: 0.16rem;
//     }
//     .headset{
//         width: .2rem;
//     }
//     .playcount{
//         font-size: 0.1rem;
//     }
// }
// .imgBox{
//     /* display: inline-block; */
//     float:left;
//     img{
//         width: 0.86rem;
//     }
// }
// .listInfo{
//     border-bottom:1px solid #e2e2e2;
//     margin-top: 0.1rem;
// }
// .img{
//     width: 1.8rem;
//     height: 1.8rem;
//     padding: 0.22rem 0;
// }
// 歌单页面
</style>
