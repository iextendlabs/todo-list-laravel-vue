import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from './components/Todo.vue';

Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: Todo,
        name: 'Todo'
    }
];

let router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes,
});
 export default router;
