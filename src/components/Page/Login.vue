<template>
    <div class="login-wrap">
        <div class="login-bg"></div>
        <div class="login-container container">
            <div class="line bouncein">
                <div class="xs6 xm4 xs3-move xm4-move">
                    <div style="height:170px;"></div>                  
                    <el-form :model="ruleForm" ref="ruleForm">
                        <div class="panel loginbox">
                            <div class="text-center margin-big padding-big-top"><h1>星融学院后台管理系统</h1></div>
                            <div class="panel-body" style="padding:30px; padding-bottom:10px; padding-top:10px;">
                                <div class="form-group">
                                    <div class="field field-icon-right">
                                        <input type="text" class="input input-big" name="name"  placeholder="登录账号" v-model="ruleForm.username" />
                                        <span class="icon icon-user margin-small"></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="field field-icon-right">
                                        <input type="password" class="input input-big" name="password" placeholder="登录密码" v-model="ruleForm.password" @keyup.enter="handleSubmit(ruleForm)"/>
                                        <span class="icon icon-key margin-small"></span>
                                    </div>
                                </div>
                            </div>
                            <div style="padding:30px;">
                                <button type="button" class="button button-block bg-main text-big input-big" @click="handleSubmit(ruleForm)">登录</button>
                            </div>
                        </div>
                    </el-form>          
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { requestLogin } from '@/api';
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            handleSubmit(formName) {
                const self = this;
                const userName = formName.username,
                    passWord = formName.password,
                    loginParams = { 
                        userName: userName, 
                        password: passWord 
                    };
                if(!userName || !passWord){
                    self.$alert('账号密码不能为空！','系统后台提示');
                    return false;
                }
                requestLogin(loginParams).then((res) => {
                    if(res.flag){
                        sessionStorage.setItem('ms_username',userName);
                        self.$router.push('/CourseList');
                    }else{
                        self.$alert(res.msg,'系统后台提示');
                        return false;
                    }
                }).catch((res) => {
                    self.$alert('系统接口错误！','系统后台提示');
                    return false;
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
    }
    .login-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        background: url(../../../static/images/login_bg.jpg);
        background-size: cover;
    }
    .loginbox {
        background: url(../../../static/images/login_cont.png);
        border: 0px;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>