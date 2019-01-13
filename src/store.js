import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //存放歌曲hash列表，切换上下一首使用
    playInfo:{
      songList: [],
      index: null
    },
    activeTitle:"",
    LyricsIsShow:false
  },
  getters:{
    now(state){
      return state.playInfo.songList[state.playInfo.index];
    }
  },
  mutations: {
    changeSongList(state, payload) {
      state.playInfo = payload;
    },
    //下一首
    nextSong(state) {
      let Index = state.playInfo.index + 1;
      if (Index >= state.playInfo.songList.length) {
        Index = 0;
      }
      state.playInfo.index = Index;
    },
    //上一首
    prevSong(state)  {
      let Index = state.playInfo.index - 1;
      if (Index < 0) {
        Index = state.playInfo.songList.length - 1;
      }
      state.playInfo.index = Index;
      console.log(state.playInfo);
    },
    changeActiveTitle(state,newTil){
      state.activeTitle = newTil
    },
    changeLyricsIsShow(state,payload){
      state.LyricsIsShow = payload.bl;
    }
  },
 
  actions: {}
});
