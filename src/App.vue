<template>
  <div id="app" :style="{'padding-bottom':$store.state.playInfo.songList.length>0?'1.5rem':'0'}">
    <Header/>
    <router-view name="navbar" />
    <keep-alive include="home">
      <router-view />
    </keep-alive>
    <!-- <Player/> -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  components:{
    Header,
    Footer
  }
}
</script>

<style>

</style>
