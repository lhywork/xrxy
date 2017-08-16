<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-content">
            <div class="form-x">
                <div class="form-group">
                    <div class="label">
                        <label for="sitename">账号名称：</label>
                    </div>
                    <div class="field">
                        <input type="text" class="input w50" placeholder="请输入账号名称" v-model="value"/>         
                        <div class="tipss red"></div> 
                    </div>
                </div>      
                <div class="form-group">
                    <div class="label">
                        <label for="sitename">默认密码：</label>
                    </div>
                    <div class="field">
                        <label style="line-height:40px;">
                            <div class="user">666666</div>
                        </label>     
                    </div>  
                </div>       
                <div class="form-group">
                    <div class="label">
                        <label></label>
                    </div>
                    <div class="field">
                        <button class="button bg-main icon-check-square-o" type="button"  @click="ckeckData()">
                            提交
                        </button>
                    </div>
                </div>      
            </div>
        </div>
    </div>
</template>

<script>
    import { checkRole,addRole } from '@/api';
    export default {
        data() {
            return {
                title: "新增角色",
                value:''
            }
        },
        methods: {
           ckeckData(){
                const self = this;
                if(!self.value){
                    self.$alert('账号名称不能为空！','系统后台提示');
                    return false;
                }
                const Params = self.value.replace(/(^\s+)|(\s+$)/g, ""); //去除空格
                checkRole(Params).then((res) => {
                    // console.log(res)
                    if(res.data.flag){
                        self.$alert(res.data.msg,'系统后台提示');
                    }else{
                        self.addData();
                    };   
                });     
           },
           addData(){
                const self = this;
                const Params = {
                    userName: self.value,
                    password: 666666
                };
                addRole(Params).then((res) => {
                    if(res.data.flag){
                        self.$alert(res.data.msg,'系统后台提示');
                    }else{
                        self.$message.success('新增成功!');
                        self.$router.push({
                            path: '/AdminRole',
                        }); 
                    };  
                });
           }
        }
    }
</script>

<style scoped>
    .panel-content {
        padding: 20px 0;
        overflow: hidden;
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