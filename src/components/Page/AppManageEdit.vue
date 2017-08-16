<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont" v-for="item in datatype">
            <el-form  class="form-x">
                <div class="form-group">
                    <div class="label">
                        <label>
                            姓名：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="姓名" v-model="item.userName" type="text"/>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            手机号：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="手机号" v-model="item.mobile" type="text"/>
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
                            <el-select v-model="item.deptId" placeholder="请选择">
                                <el-option v-for="depart in departments" :label="depart.name" :key="depart.id" :value="depart.id"></el-option>
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
                            <el-select v-model="item.rank" placeholder="请选择">
                                <el-option v-for="posit in positions" :label="posit.name" :key="posit.id" :value="posit.id"></el-option>
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
                        <el-radio class="radio" v-model="item.roleType" :label="0">公众</el-radio>
                        <el-radio class="radio" v-model="item.roleType" :label="1">讲师</el-radio>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            工号：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="工号" v-model="item.jobNo" type="text"/> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            邮箱：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="邮箱" v-model="item.mail" type="text"/> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                        </label>
                    </div>
                    <div class="field">
                        <button class="button bg-main icon-plus-square-o" @click="handleEdit()" type="button">
                            提交
                        </button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { getRoleappList,getDeptAndPosition,editRoleapp } from '@/api';
    export default {
        data() {
            return {
                title: "新增账号",
                updateUrl: this.BaseUrl + '/roleapp/update/',
                departments:[],
                positions:[],
                iphone:'',
                page:1,
                rows: 1,
                datatype:[]
            }
        },
        created(){
            this.selectData(); 
        },
        methods: { 
            selectData(){
                const self = this;
                getDeptAndPosition().then((res) => {
                    self.departments = res.data.departments;
                    self.positions = res.data.positions;
                })
                self.getData();
            },
            getData(){
                const self = this;
                const Params = self.page + '/' + self.rows + '/' + self.$route.query.mobile;
                getRoleappList(Params).then((res) => {
                    this.datatype = res.data.rows;
                })
            },
            handleEdit(){
                const self = this;
                if(self.datatype[0].userName == ''){
                    this.$message({
                        type:'error',
                        message:'用户名不能为空'
                    })
                }else if(!self.datatype[0].mobile){
                    self.msgAlert('手机号不能为空');
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(self.datatype[0].mobile))){
                    self.msgAlert('手机号输入不正确！');
                }else if(self.datatype[0].jobNo && self.datatype[0].jobNo.length > 5){
                    this.$message({
                        type:'error',
                        message:'工号不能大于5位'
                    })
                    return false;               
                }else{
                    this.addUser();
                }
            },
            addUser(){
                const self = this;
                let Params = {
                    userId:self.datatype[0].userId,
                    mobile:self.datatype[0].mobile,
                    roleType:self.datatype[0].roleType,
                    userName:self.datatype[0].userName,
                    deptId:self.datatype[0].deptId,
                    rank:self.datatype[0].rank,
                    jobNo:self.datatype[0].jobNo,
                    mail:self.datatype[0].mail
                }
                editRoleapp(self.datatype[0].id,Params).then((res) => {
                    if(res.data.flag){
                        self.$message.success(res.data.msg); 
                        self.$router.push({
                            path:'AppManage',
                        }) 
                   }else{
                        self.$message.error(res.data.msg); 
                   }
                })
            },
            //系统消息提示
            msgAlert(title){
                this.$alert(title,'系统后台提示');
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