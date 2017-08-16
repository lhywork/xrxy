<template>
  <!--公共header模块-->
  <div class="header bg-main">
      <div class="head-logo margin-big-left fadein-top">
          <h1>
              <img :src="img" class="radius-circle rotate-hover" height="50" :title="userName" />
              {{ title }} 
          </h1>
      </div>
      <div class="head-l">
            <router-link to="/CourseList" class="button button-little bg-green" >
                <span class="icon-home">
                </span>
                首页
            </router-link>
            &nbsp;&nbsp;
            <a href="javascript:history.go(-1);" class="button button-little bg-blue">
                <span class="icon-reply">
                </span>
                后退
            </a>
            &nbsp;&nbsp;
            <a class="button button-little bg-red" href="javascript:void(0);" @click="loginOut()">
                <span class="icon-power-off">
                </span>
                退出登录
            </a>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
            img: './static/images/admin.jpg',
            title: '星融书院后台管理',
            userName: ""
        }
    },
    created(){
        const self = this;
        let userName = sessionStorage.getItem('ms_username');
        if(userName){
             this.userName = userName;  
        }else{
            self.$router.push('/login');
        }
    },
    methods: {
        loginOut(){
            const self = this;
            this.$confirm('确认退出吗?', '提示', {
                type: 'warning'
            }).then(() => {
                sessionStorage.removeItem('ms_username');
                self.$router.push('/login');
            }).catch(() => {
                            
            });           
        }     
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header{
    width: 100%;
    height: 70px;
    overflow: hidden;
    background: url('../../../static/images/header_bg.jpg') no-repeat 0 -1000px;
    .head-logo{ 
        float:left; 
        color:#FFF; 
        margin-top:10px; 
        line-height:45px;
        img{ 
            float:left; 
            margin-right:10px;
        }
    }
    .head-l{ 
        float:left; 
        margin-top:17px; 
        margin-left:15px;
        .button{ 
            padding:8px 15px;
        }
        .bg-blue:hover{ 
            background-color:#03b6fd;
        } 
    }
}
</style>
