
require('./bootstrap');

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router.js';

Vue.use(VueAxios, axios);
// Vue.component('todo', require('./components/Todo.vue').default);
// import Todo from './components/Todo.vue'

const app = new Vue({
    el: '#app',
    router
});
