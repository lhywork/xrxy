<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <el-form  class="form-x">
                <div class="form-group">
                    <div class="label">
                        <label>
                            姓名：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="姓名" v-model="username" type="text"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            手机号：
                        </label>
                    </div>
                    <div class="field" :class="iphoneMsg ? 'check-error' : ''">
                        <input class="courseName input" placeholder="手机号" v-model="iphone" type="text"/>
                        <div class="tipss" :class="iphoneMsg ? 'red' : ''" >
                            {{iphoneMsg}}
                        </div>
                    </div>        
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            营销部：
                        </label>
                    </div>
                    <div class="field">
                        <el-form-item>
                            <el-select v-model="saledepa" placeholder="请选择">
                                <el-option v-for="item in departments" :label="item.name" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> 
                    </div>                                  
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            职业：
                        </label>
                    </div>
                    <div class="field">
                        <el-form-item>
                            <el-select v-model="work" placeholder="请选择">
                                <el-option v-for="item in positions" :label="item.name" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item> 
                    </div>                                  
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            类型：
                        </label>
                    </div>
                    <div class="field" style="padding-top:12px;">
                        <el-radio class="radio" v-model="roleType" label="0">公众</el-radio>
                        <el-radio class="radio" v-model="roleType" label="1">讲师</el-radio>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            工号：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="工号" v-model="jobNo" type="text"/> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            邮箱：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="邮箱" v-model="email" type="text"/> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                        </label>
                    </div>
                    <div class="field">
                        <button class="button bg-main icon-plus-square-o" @click="handleAdd()" type="button">
                            提交
                        </button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { checkRoleapp,getDeptAndPosition,addRoleapp } from '@/api';
    export default {
        data() {
            return {
                title: "添加角色",
                departments:[],
                positions:[],
                username:'',
                usernameMsg:'',
                iphone:'',
                iphoneMsg:'',
                saledepa:'',
                work:'',
                roleType: "0",
                jobNo:'',
                email:''
            }
        },
        created(){
            this.getData();
        },
        methods: { 
            getData(){
                const self = this;
                getDeptAndPosition().then((res) => {
                    self.departments = res.data.departments;
                    self.positions = res.data.positions;
                })
            },
            handleAdd(){
                const self = this;
                if(!self.username){
                    self.msgAlert('姓名不能为空');
                }else if(!self.iphone){
                    self.msgAlert('手机号不能为空');
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(self.iphone))){
                    self.msgAlert('手机号输入不正确！');
                }else if(!self.saledepa){
                    self.msgAlert('请选择营业部！');
                }else if(!self.work){
                    self.msgAlert('请选择职业');
                }else if(self.jobNo.length >5){
                    self.msgAlert('工号不能大于5位');
                }else{
                    self.addUser();
                }
            },
            addUser(){
                const self = this;
                const Params= [{
                    mobile:self.iphone,
                    roleType:self.roleType,
                    userName:self.username,
                    deptId:self.saledepa,
                    rank:self.work,
                    jobNo:self.jobNo,
                    mail:self.email
                }]
                addRoleapp(Params).then((res) => {
                    if(res.data.flag){
                        self.$message.success(res.data.msg);
                        self.$router.push({
                            path:'AppManage',
                        })
                    }else{
                        self.msgAlert(res.data.msg); 
                    }
                })
            },
            //系统消息提示
            msgAlert(title){
                this.$alert(title,'系统后台提示');
            }
        },
        watch: {
            iphone: function(iphone){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(iphone))){
                    return false;
                }else{
                   checkRoleapp(iphone).then((res) => {
                        if(res.data.flag){
                            this.iphoneMsg = res.data.msg;
                        }else{
                            this.iphoneMsg = ""; 
                        }
                    }); 
                }
            }
        }   
    }    
</script>

<style scoped>
    .panel-cont {
        padding: 20px 0;
        overflow: hidden;
    }
    h5{
        font-weight: bold;
    }
    .button {
        padding: 8px 15px;
    }
    .form-group{
        padding-bottom: 20px;
    }
    .form-x .tipss {
        float: left;
        padding-left: 10px;
        color: #888;
        line-height: 42px;
    }
    .el-form-item {
        margin-bottom: 22px;
        width: 25%;
        float: left;
    }
    .form-x .el-select{
        width: 100%;
    }
    .form-x .el-input__inner{
        height: 42px;
    }
    .form-x .el-form-item__content{
        margin-left: 0!important;
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
    .form-x .green{
        color: green;
    }
    .form-x .chapterNum,.form-x .chapterName{
        width: 10%;
    }
    .form-x .form-group .chapterType{
        width: 20%;
        margin-left: 10px;
    }
    .form-x .form-group .labelName{
        width: 6%;
    }
    .label label{
        font-weight: 500;
    } 
</style>