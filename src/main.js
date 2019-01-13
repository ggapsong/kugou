import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import MintUI from "mint-ui";
import "mint-ui/lib/style.min.css";
import "./assets/css/reset.css";
import axios from "axios";
import jsonp from 'jsonp'
Vue.config.productionTip = false;
Vue.prototype.$ajax = axios;
Vue.prototype.$jsonp = jsonp;
Vue.use(MintUI);
//注册过滤器
Vue.filter("imgUrl",(data,size=240)=>{
  if(data){
    return data.replace('{size}',size);
  }else{
    return data
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
