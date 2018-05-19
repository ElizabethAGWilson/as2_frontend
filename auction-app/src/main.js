import Vue from 'vue'
import App from './App.vue'
import Auction from './Auction.vue'
import UserProfile from './UserProfile'
import UserOptions from './UserOptions'
import Categories from './Categories'
import Auctions from './Auctions'

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;

const routes = [
  {
    path: "/",
    components: {
      side: Categories,
      main: Auctions
    }
  },
  {
    path: '/auction/:auctionId',
    //path: '/auction',
    components: {
      main: Auction,
      side: Categories
    },
  },
  {
    path: "/user/:userId",
    components: {
      main: UserProfile,
      side: UserOptions
    }
  }
];

const router = new VueRouter ({
  routes: routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
