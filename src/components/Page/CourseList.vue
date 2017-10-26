<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <div id="listform">
                <div class="padding border-bottom">
                    <ul class="search">
                        <li>
                            <a class="button border-main icon-plus-square-o" href="javascript:void(0);" @click="handleAdd()">
                                添加课程
                            </a>
                        </li>
                        <li>
                            <el-select placeholder="课程类别" v-model="selected">
                                <el-option label="课程类别" key="" value=""></el-option>
                                <el-option v-for="item in typeData" :label="item.name" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </li>
                        <li>
                            <input v-model="name" type="text" placeholder="请输入课程名称" name="keywords" class="input keywords" @keyup.enter="handleSearch(name)"/>
                            <a href="javascript:void(0)" class="button border-main icon-search" @click="handleSearch(name)">
                                搜索
                            </a>
                        </li>
                    </ul>
                </div>
                <table class="table table-hover text-center">
                    <tbody>
                        <tr>
                            <th>ID</th>
                            <th>课程名称</th>
                            <th>课程章节数</th>
                            <th>推荐</th>
                            <th>课程类型</th>
                            <th>操作</th>
                            <th>更新时间</th>
                        </tr>
                    </tbody>
                    <tbody id="course-list">
                        <tr v-for="item in tableData">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>                       
                            <td>{{item.chaperNum}}</td>
                            <td v-if="item.isDisplay">是</td><td v-else>否</td>
                            <td>{{item.typeName}}</td>
                            <td>
                                <div class="button-group">
                                    <a @click="handleCheck(item.id)" class="button border-green" href="javascript:void(0);" >
                                        <span class="icon-eye"></span>
                                        查看
                                    </a>
                                    <a @click="handleEdit(item.id)" class="button border-main" href="javascript:void(0);">
                                        <span class="icon-edit"></span>
                                        编辑
                                    </a>
                                    <a @click="handleDelete(item.id)" class="button border-red" href="javascript:void(0);">
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
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { getCourseList,getCourseType,deleteCourse } from '@/api';
    export default {
        data() {
            return {
                title: "课程管理",
                selected:"",
                curPage: 1,
                rows: 10,
                name: '',
                typeId: '',
                tableData: [],
                typeData:[],
                records:1,
                pageTotal:1
            }
        },
        created(){
            sessionStorage.setItem('sub_title','全部课程');
            this.getData();
            this.getTypeData();
        },
        methods: {
            handleCurrentChange(val){
                this.curPage = val;
                this.getData();          
            },
            //获取课程列表数据
            getData(){
                const self = this;
                const Params = { 
                    page: this.curPage, 
                    rows: this.rows,
                    name: this.name,
                    typeId: this.typeId                
                };
                
                getCourseList(JSON.stringify(Params)).then((res) => {
                    self.tableData = res.data.rows;
                    self.pageTotal = res.data.total;
                    self.records = res.data.records;
                });            
            },
            //获取课程类别数据
            getTypeData() {
                const self = this;
                getCourseType().then((res) => {
                    self.typeData = res.data;
                });
            },
            //点击添加
            handleAdd(){
                sessionStorage.setItem('sub_title','添加课程');
                this.$router.push('/CourseAdd');
            },
            //点击查看
            handleCheck(index){
                sessionStorage.setItem('sub_title','查看课程');
                this.$router.push({
                    path: 'CourseCheck',
                    query: {
                        id: index
                    }
                });
            },
            //点击编辑
            handleEdit(index) {
                sessionStorage.setItem('sub_title','编辑课程');
                this.$router.push({
                    name: 'CourseEdit',
                    query: {
                        id: index
                    }
                });
            },
            //点击删除
            handleDelete(lessionId) {
                const self = this;
                self.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    type: 'warning'
                }).then(() => {
                    deleteCourse(lessionId).then((res) => {
                        if(res.data.flag){
                            self.getData();
                            self.$message.success('删除成功!');
                        };                       
                    });
                }).catch(() => {
                    // this.$message.info('已取消删除!');          
                });
            },
            //课程名称查询
            handleSearch(val) {
                this.name = val.replace(/(^\s+)|(\s+$)/g, ""); //去除空格
                this.getData();
            },
            //上一页
            handleprev(page){
                const self = this;
                if(self.curPage == 1){
                    self.curPage = 1;
                    self.$message.error('已经是第一页了！');
                }else{
                    self.curPage--;
                }
                self.getData(); 
            },
            //下一页
            handlenext(page) {
                const self = this;
                if(self.curPage == self.pageTotal){
                    self.curPage = self.pageTotal;
                    self.$message.error('已经是最后一页了！');
                }else{
                    self.curPage++;
                }
                this.getData();
            }
        },
        watch: {
            //课程类别查询
            selected: function(value) {
                const self = this;
                self.typeId = value;
                self.curPage = 1;
                self.getData();
            }
        }
    }
</script>

<style scoped>
    h5{
        font-weight: bold;
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
</style>