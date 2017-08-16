import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router); //将VueRouter注入Vue

const Login = resolve => require(['../components/page/Login.vue'], resolve);
const Home = resolve => require(['../components/common/Home.vue'], resolve);
const CourseList = resolve => require(['../components/page/CourseList.vue'], resolve);
const CourseCheck = resolve => require(['../components/page/CourseCheck.vue'], resolve);
const CourseRmend = resolve => require(['../components/page/CourseRmend.vue'], resolve);
const CourseType = resolve => require(['../components/page/CourseType.vue'], resolve);
const CourseAdd = resolve => require(['../components/page/CourseAdd.vue'], resolve);
const CourseEdit = resolve => require(['../components/page/CourseEdit.vue'], resolve);
const AppManage = resolve => require(['../components/page/AppManage.vue'], resolve);
const AppManageAdd = resolve => require(['../components/page/AppManageAdd.vue'], resolve);
const AppManageEdit = resolve => require(['../components/page/AppManageEdit.vue'], resolve);
const AdminRole = resolve => require(['../components/page/AdminRole.vue'], resolve);
const AdminEdit = resolve => require(['../components/page/AdminEdit.vue'], resolve);
const AdminAdd = resolve => require(['../components/page/AdminAdd.vue'], resolve);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '*',
            redirect: '/CourseList'
        },
        {
            path: '/CourseList',
            component: Home,
            children:[
                {
                    path: '/',
                    component: CourseList
                },
                {
                    path: '/CourseCheck',
                    component: CourseCheck
                },
                {
                    path: '/CourseRmend',
                    component: CourseRmend    
                },
                {
                    path: '/CourseType',
                    component: CourseType
                },
                {
                    path: '/CourseAdd',
                    component: CourseAdd
                },
                {
                    path: '/CourseEdit',
                    name: 'CourseEdit',
                    component: CourseEdit
                },        
                {
                    path: '/AppManage',
                    component: AppManage
                },
                {
                    path: '/AppManageAdd',
                    component: AppManageAdd
                },
                {
                    path: '/AppManageEdit',
                    component: AppManageEdit
                },          
                {
                    path: '/AdminRole',
                    component: AdminRole
                },
                {
                    path: '/AdminEdit',
                    component: AdminEdit
                },
                {
                    path: '/AdminAdd',
                    component: AdminAdd
                }
            ]
        }
    ]
})
