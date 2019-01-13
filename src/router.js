import Vue from "vue";
import Router from "vue-router";
import Search from "@/views/Search.vue";
import SingerList from "@/views/singers/SingerList.vue";
import SingerInfo from "@/views/singers/SingerInfo/SingerInfo.vue";
import RankInfo from "@/views/rank/RankInfo.vue";
import ListInfo from "@/views/list/ListInfo.vue";
Vue.use(Router);
import {navBar} from "./router/nav"
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
        ...navBar,
        // 歌手
        {
          path: "/singer/list/:id",
          name: "singerlist",
          component: SingerList
        },
        {
          path: "/singer/info/:id",
          name: "singerinfo",
          component: SingerInfo
        },
        //rank
        {
          path: "/rank/info/:id",
          name: "rankinfo",
          component: RankInfo,
        },
        //list歌单
        {
          path: "/plist/list/:id",
          name: "listinfo",
          component: ListInfo,
        },
        {
          path: "/search",
          name: "search",
          component: Search
        }
    
  ]
});
