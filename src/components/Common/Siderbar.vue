<template>
<div class="main-nav">
    <!--左侧导航模块-->
    <div class="sidebar main-leftnav">
        <div class="nav-title">
            <strong><span class="icon-list"></span>菜单列表</strong>
        </div>
        <el-menu :default-active="onRoutes"  router @select="handleSelect">
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><span :class="item.icon"></span>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            <span class="icon-caret-right"></span>{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
    <!-- 顶部导航模块 -->
    <div class="main-topnav">
      <ul class="bread">
          <li><a href="javascript:void(0);" target="right" class="icon-home">首页</a></li>
          <li>{{firsTitle}}</li>
          <li>{{title}}</li>
          <li><b>当前语言：</b><span style="color:red;">中文</span></li>
      </ul>
    </div>
</div>
</template>

<script>
export default {
    name: 'Sidebar',
    data () {
        return {
            firsTitle:'课程管理',
            title: '全部课程',
            items: [{
                icon: 'icon-user',
                index: '1',
                title: '课程管理',
                subs: [{
                    index: 'CourseList',
                    title: '全部课程'
                },{
                    index: 'CourseRmend',
                    title: '推荐课程'
                },
                {
                    index: 'CourseType',
                    title: '课程类别'
                }]
            },{
                icon: 'icon-pencil-square-o',
                index: '2',
                title: '角色管理',
                subs: [{
                    index: 'AppManage',
                    title: 'App角色'
                },{
                    index: 'AdminRole',
                    title: '后台角色'
                }]
            }]
        }
    },
    methods: {
        handleSelect:function(index){
            var self = this;
            this.items.forEach(function(item){
                item.subs.forEach(function(sub){
                    if(sub.index == index){
                        sessionStorage.setItem('sub_title',sub.title);                   
                    }
                })
            });
        }
    },
    computed:{
        onRoutes(){
            if(sessionStorage.getItem('sub_title')){
                this.title = sessionStorage.getItem('sub_title');
            }
            if(this.title.indexOf('课程') > -1){
                this.firsTitle = '课程管理';
            }else{
                this.firsTitle = '角色管理';
            }        
            return this.$route.path.replace('/','');      
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-leftnav{
    width: 180px;
    height: 100%;
    position: fixed;
    top: 70px;
    left: 0px;
    .nav-title {
        height: 40px;
        background: url('../../../static/images/header_bg.jpg') no-repeat 0 -1000px;
        color: #FFF;
        padding-left: 22px;
        font-size: 14px;
        line-height: 40px;
        span {
            margin-right: 10px;
        }
    }
    .el-menu{
        padding-left:0;
        position: relative;
        margin: 0;
    }
    .el-submenu{
        transition: border-color .3s,background-color .3s,color .3s;
        display: block;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px; 
        width: 180px;
        line-height: 40px;
    }
    .el-submenu.is-opened {
        color: #09c;
    }
    .is-active{
        color: #09c;
    }
    .el-submenu-title{
        
    } 
    .el-menu-item{
        line-height:40px;
        height:40px;
        font-weight: 500;
    }
    .border-bottom {
        border-bottom: 1px solid #b5cfd9;
    }
    .el-submenu span {
        margin-right: 10px;
    }
    .el-submenu .el-menu-item span {
        margin-right: 8px;
    }
    .el-submenu:hover {
        color: #09c;
    }
    .el-menu-sub{
        border-top: 1px solid #b5cfd9;
        padding: 5px 0;
        opacity: 1;
    }
    ul li {
        list-style-type: none;
    }
    ul li a {
        display: block;
        padding-left: 30px;
    }

    ul li a:hover, ul li a.on {
        color: #09c;
    }
}
.main-topnav{
  background: #f2f9fd;
  .bread{
    margin-left:205px; 
    padding: 0;
    overflow: hidden;
    height: 40px;
      line-height: 40px;
      li{
        float: left;
      }
  }
}
</style>
