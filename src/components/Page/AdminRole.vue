<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <div class="padding border-bottom">
                <ul class="search">
                    <li>
                        <router-link to="/AdminAdd" class="button border-main icon-plus-square-o" >
                        新建账号
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="content-table">
                <table class="table table-hover text-center">
                    <tbody>
                        <tr class="roleappList">
                            <th>账号名称</th>
                            <th>操作</th>
                            <th>更新时间</th>
                        </tr> 
                    </tbody>
                    <tbody id="course-list">
                        <tr v-for="item in typeData">
                            <td>{{item.userName}}</td>
                            <td>
                                <div class="button-group">
                                        <a @click="handleEdit(item.id, item.userName)" class="button border-main" href="javascript:void(0);">
                                            <span class="icon-edit"></span>编辑
                                        </a>
                                        <a @click="handleDelete(item.id)" class="button border-red" href="javascript:void(0);">
                                            <span class="icon-trash-o"></span>删除
                                        </a>
                                </div>
                            </td>
                            <td>{{item.updateTime}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import { getRoleList,deleteRole } from '@/api';
    export default {
        data() {
            return {
                title: "后台角色",
                page:1,
                rows:50,
                typeData:[],
                records:'',
                total:'',
            }
        },
        created(){
           this.getData(); 
        },
        methods: {
            getData(){
                const self = this;
                const Params = self.page + '/' + self.rows;
                getRoleList(Params).then((res) => {
                    self.typeData = res.data.rows;
                    self.records = res.data.records;
                    self.total = res.data.total;
                })
            },
            //点击删除
            handleDelete(id){
                const self = this;
                self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteRole(id).then((res) => {
                        if(res.data.flag){
                            self.getData();
                            self.$message.success('删除成功!');
                        };                       
                    });
                }).catch((res)=>{
                    console.log(res)
                });
            },
            //点击编辑
            handleEdit(id, userName) {
                sessionStorage.setItem('edit_username',userName);
                this.$router.push({
                    path: 'AdminEdit',
                    query: {
                        id: id
                    }
                });
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
        padding: 10px;
    }
    .pagelist {padding:10px 0; text-align:center;}
    .pagelist span,.pagelist a{ border-radius:3px; border:1px solid #dfdfdf;display:inline-block; padding:5px 12px;cursor: pointer;}
    .pagelist a{ margin:0 3px;}
    .pagelist span.current{ background:#09F; color:#FFF; border-color:#09F; margin:0 2px;}
    .pagelist a:hover{background:#09F; color:#FFF; border-color:#09F; }
    .pagelist label{ padding-left:15px; color:#999;}
    .pagelist label b{color:red; font-weight:normal; margin:0 3px;}
</style>