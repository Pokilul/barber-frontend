import Vue from 'vue'
import axios from "axios";
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

var token = localStorage.getItem('token');
if(token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faHouse, faCalendarPlus, faBasketShopping, faImages, faCommentDots, faUsers, faScissors } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faHouse, faCalendarPlus, faBasketShopping, faImages, faCommentDots, faUsers, faScissors )

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
