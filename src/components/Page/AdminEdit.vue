<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-content">
            <div class="form-x">
                <div class="form-group">
                    <div class="label">
                        <label for="sitename">管理员帐号：</label>
                    </div>
                    <div class="field">
                        <label style="line-height:40px;">
                            <div class="user" id="admin-user">{{userName}}</div>
                        </label>
                    </div>
                </div>      
                <div class="form-group" :class="passMsg ? 'check-error' : ''">
                    <div class="label">
                        <label for="sitename">原密码：</label>
                    </div>
                    <div class="field">
                        <input type="password" class="input w50" placeholder="请输入原密码"  v-model="oldPwd"/>
                        <div class="tipss" :class="passMsg ? 'red' : ''">{{passMsg}}</div>       
                    </div>  
                </div>      
                <div class="form-group" :class="newPwdMsg ? 'check-error' : ''">
                    <div class="label">
                        <label for="sitename">新密码：</label>
                    </div>
                    <div class="field">
                        <input type="password" class="input w50" placeholder="请输入新密码"  v-model="newPwd"/>         
                        <div class="tipss" :class="newPwdMsg ? 'red' : ''">{{newPwdMsg}}</div> 
                    </div>
                </div>
                <div class="form-group" :class="rePasswordMsg ? 'check-error' : ''">
                    <div class="label">
                        <label for="sitename">确认新密码：</label>
                    </div>
                    <div class="field">
                        <input type="password" class="input w50" placeholder="请再次输入新密码" v-model="rePassword"/>          
                         <div class="tipss" :class="rePasswordMsg ? 'red' : ''">{{rePasswordMsg}}</div>
                    </div>  
                </div>  
                <div class="form-group">
                    <div class="label">
                        <label></label>
                    </div>
                    <div class="field">
                        <button class="button bg-main icon-check-square-o" type="button"  @click="sure()">
                            提交
                        </button>
                    </div>
                </div>      
            </div>
        </div>
    </div>
</template>

<script>
    import { editRole } from '@/api';
    export default {
        data() {
            return {
                title: "编辑角色",
                userName:'',
                oldPwd:'',
                newPwd:'',
                rePassword:'',
                passMsg:'',
                newPwdMsg:'',
                rePasswordMsg:''

            }
        },
        created(){
            const self = this;
            const userName = sessionStorage.getItem('edit_username');
            if(userName){
                 this.userName = userName;  
            }else{
                self.$router.push('/login');
            }
        },
        methods: {
            sure(){
                const self = this; 
                const id = self.$route.query.id;
                if(!self.oldPwd){
                    self.passMsg = '原密码不能为空！';
                }else if(!self.newPwd){
                    self.newPwdMsg = '新密码不能为空！';
                }else if(!self.rePassword){
                    self.rePasswordMsg = '确认新密码不能为空！';
                }else if(self.rePassword == self.newPwd){
                    const Params = {
                        password: self.oldPwd,
                        rePassword: self.rePassword
                    }
                    editRole(self.$route.query.id,Params).then((res) => {
                        if(res.data.flag){
                            self.$message.success('修改成功！');
                            self.$router.push({
                                path: '/AdminRole',
                            }); 
                        }else{
                            self.$alert(res.data.msg,'系统后台提示');
                        };   
                    })
                }
            }
        },
        watch: {
            oldPwd: function(oldPwd){
                const self = this; 
                if(self.oldPwd){
                    self.passMsg = '';
                }else{
                    self.passMsg = '原密码不能为空！';
                }
            },
            newPwd: function(newPwd){
                const self = this; 
                if(self.newPwd){
                    self.newPwdMsg = '';
                }else{
                    self.newPwdMsg = '新密码不能为空！';
                }
            },
            rePassword: function (rePassword) {
                const self = this;
                if(rePassword == this.newPwd && rePassword){
                    self.rePasswordMsg = '';
                }else if(!rePassword){
                    self.rePasswordMsg = '确认新密码不能为空！';
                }else{
                    self.rePasswordMsg = '两次密码输入不一致输入正确';                   
                }
            }
        }
    }
</script>

<style scoped>
    .panel-content{
        padding: 20px 0;
        overflow: hidden;
    }
    h5{
        font-weight: bold;
    }
    .button {
        padding: 8px 15px;
    }
    .form-x .tipss {
        float: left;
        padding-left: 10px;
        color: #888;
        line-height: 42px;
    }
    .form-x .form-group {
        margin-bottom: 12px;
    }
    .form-x .label label{
        font-weight: 500;
    }
    .form-x .form-group .label {
        width: 10%;
        display: block;
        line-height: 28px;
        color: #202020;
    }
    .form-x .input{
        width: 25%;
        float: left;
    }
    .form-x .red{
        color: red;
    }
    .button {
        padding: 8px 15px;
    }
</style>