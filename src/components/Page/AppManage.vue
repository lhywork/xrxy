<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <div class="padding border-bottom">
                <ul class="search">
                    <li>
                        <router-link to="/AppManageAdd" class="button border-main icon-plus-square-o" >
                        添加角色
                        </router-link>
                    </li>
                    <li>
                        <input type="text" placeholder="请输入手机号" name="keywords" class="input keywords" v-model="mobileVal"  @keyup.enter="handleSearch()"/>
                        <a href="javascript:void(0)" class="button border-main icon-search"  @click="handleSearch()">
                            搜索
                        </a>
                    </li>
                </ul>
            </div>
            <table class="table table-hover text-center">
                <tbody>
                    <tr class="roleappList">
                        <th>id</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>营业部</th>
                        <th>职位</th>
                        <th>类型</th>
                        <th>操作</th>
                        <th>更新时间</th>
                    </tr>
                </tbody>
                <tbody id="course-list">
                    <tr v-for="item in tableData">
                        <td>{{item.id}}</td>
                        <td>{{item.userName}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.deptName}}</td>
                        <td>{{item.rankName}}</td>
                        <td>{{item.roleTypeName}}</td>
                        <td>
                             <div class="button-group">
                                <a @click="handleEdit(item.mobile)" class="button border-main" href="javascript:void(0);">
                                    <span class="icon-edit"></span>
                                    编辑
                                </a>
                                <a @click="handleDelete(item.userId)" class="button border-red" href="javascript:void(0);">
                                    <span class="icon-trash-o"></span>
                                    删除
                                </a>
                            </div>
                        </td>
                        <td>{{item.updateTime}}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr v-if="tableData.length">
                        <td colspan="8">
                            <div class="pagelist" id="pagelist">
                                <el-pagination :page-size="rows" layout="prev, pager, next" :total="records" @current-change="handleCurrentChange">
                                </el-pagination>
                            </div>
                        </td>
                    </tr>
                    <tr v-else>
                        <td colspan="8" style="padding:10px 0;">
                        没有查询到数据~
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { getRoleappList,deleteRoleapp } from '@/api';
    export default {
        data() {
            return {
                title: "APP管理",
                rows: 10,
                tableData:[],
                mobileVal:'',
                mobile:'-1',
                records: 1,
                total: 1,
                page:1,
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData() {
                const self = this;
                const Params = self.page + '/' + self.rows + '/' + self.mobile;
                getRoleappList(Params).then((res) => {
                    self.tableData = res.data.rows;
                    self.records = res.data.records;
                    self.total = res.data.total;
                });
            },
            //分页
            handleCurrentChange(val){
                this.page = val;
                this.getData();
            },
            //点击编辑
            handleEdit(mobile) {
                this.$router.push({
                    path: 'AppManageEdit',
                    query: {
                        mobile: mobile,
                    }
                });
            },
            //点击删除
            handleDelete(lessionId) {
                const self = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteRoleapp(lessionId).then((res) => {
                        if(res.data.flag){
                            self.getData();
                            self.$message.success('删除成功!');
                        };                       
                    });
                }).catch((res)=>{
                    console.log(res)
                });
            },
            //手机号码搜索
            handleSearch(){
                const self = this;
                const reg = new RegExp("^[0-9]*$");
                if(self.mobileVal == ''){
                    self.$alert('搜索不能为空，请输入手机号码！','系统后台提示');
                    return false;
                }
                if(!reg.test(self.mobileVal)){
                    self.$alert('请输入数字！','系统后台提示');
                    return false;
                }
                self.mobile = self.mobileVal.replace(/(^\s+)|(\s+$)/g, ""); //去除空格 
                self.getData();
            }
        }
    }
</script>

<style scoped>
    h5{
        font-weight: bold;
    }
    .button {
        padding: 8px 15px;
    }
    .search {
        overflow: hidden;
        padding-left:10px;
    }
    .search li {
        float: left;
        margin-right: 15px;
        line-height: 35px
    }
    .search .input{
        width: 200px;
        line-height: 16px;
        cursor: pointer;
    }
    .search .keywords{
        width:250px; 
        line-height:16px;
        display:inline-block;
    }
    .button {
        padding: 8px 15px;
    }
    .table th{
        text-align: center;
        padding: 12px;
    }
    .table td {
        vertical-align: middle;
    }
    .pagelist {padding:10px 0; text-align:center;}
    .pagelist span,.pagelist a{ border-radius:3px; border:1px solid #dfdfdf;display:inline-block; padding:5px 12px;cursor: pointer;}
    .pagelist a{ margin:0 3px;}
    .pagelist span.current{ background:#09F; color:#FFF; border-color:#09F; margin:0 2px;}
    .pagelist a:hover{background:#09F; color:#FFF; border-color:#09F; }
    .pagelist label{ padding-left:15px; color:#999;}
    .pagelist label b{color:red; font-weight:normal; margin:0 3px;}
</style>