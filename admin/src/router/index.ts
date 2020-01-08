import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import CourseList from '../views/courses/CourseList.vue'
import CourseEdit from '../views/courses/CourseEdit.vue'
import ResourceCrud from '../views/ResourceCrud.vue'


Vue.use(VueRouter)
// 加一个类型，有注释提示
const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'ResourceCrud', path: '/:resource/list', component: ResourceCrud, props:true },
      // { name: 'CourseList', path: '/courses/list', component: CourseList },
      // { name: 'CourseEdit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      // { name: 'CourseCreate', path: '/courses/create', component: CourseEdit }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
