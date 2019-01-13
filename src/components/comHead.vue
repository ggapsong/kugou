<template>
    <div class="comHead">
      <mt-header :title="title" class="comHeadBox">
        <div @click="$router.history.go(-1)" slot="left">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:this.$store.state.activeTitle
        }
    }
}
</script>

<style lang="less" scoped>
.comHead{
    // margin-top:-0.2rem;
    .comHeadBox{
        background-color: #fff;
        color:#000;
        // box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
    }   
}

</style>
