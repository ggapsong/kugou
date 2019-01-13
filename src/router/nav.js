import Home from "@/views/Home.vue";
import NewSong from "@/views/NewSong.vue";
import Rank from "@/views/Rank.vue";
import List from "@/views/List.vue";
import Singer from "@/views/Singer.vue";
export const navBar=[
    {
        path: "/",
        name: "NewSong",
        title: "新歌",
        components: {
           default: NewSong,
           navbar: Home
        }
    },
    {
        path:"/Rank",
        name:"Rank",
        title:"排行",
        components:{
            default:Rank,
            navbar: Home
        }
    },
    {
        path:"/List",
        name:"List",
        title:"歌单",
        components:{
            default:List,
            navbar: Home
        }
    },
    {
        path:"/Singer",
        name:"Singer",
        title:"歌手",
        components:{
            default:Singer,
            navbar: Home
        }
    }
] 