<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <div class="padding border-bottom">
                <ul class="search">
                    <li>
                        <a class="button border-main icon-plus-square-o" href="javascript:void(0);" @click="handleAdd()">
                            添加课程
                        </a>
                    </li>
                </ul>
            </div>
            <table class="table table-hover text-center">
                <tbody>
                    <tr>
                        <th>排序ID</th>
                        <th>课程名称</th>
                        <th>推荐</th>
                        <th>操作</th>
                        <th>更新时间</th>
                    </tr>
                </tbody>
                <tbody id="course-list" v-if="tableData.length">
                    <tr v-for="(item,index) in tableData" draggable="true" :data-id="item.id">
                        <td>{{item.serial}}</td>
                        <td>{{item.name}}</td>
                        <td>是</td>                    
                        <td>
                            <div class="button-group">
                                <a class="button border-main" href="javascript:void(0);" @click="movePrev(item.serial,item.id,index)"> 
                                    <span class="icon-edit"></span>
                                    上移
                                </a>
                                <a class="button border-main" href="javascript:void(0);" @click="moveNext(item.serial,item.id,index)">
                                    <span class="icon-edit"></span>
                                    下移
                                </a>
                                <a class="button border-red" href="javascript:void(0);" @click="handleCancel(item.id)">
                                    <span class="icon-trash-o"></span>
                                    取消推荐
                                </a>
                            </div>
                        </td>
                        <td>{{item.updateTime}}</td>
                    </tr>                      
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" style="padding:10px 0;">
                        暂无推荐课程数据~
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import { getRmendList,rmendCancel,rmendOrder } from '@/api';
    export default {
        data() {
            return {
                title: "课程推荐",
                curPage: 1,
                rows:20,
                tableData: [],
                dragElement: null,
                lock: true,
                old:{
                   oldindex:'',
                   oldid:'',
                   oldornumber:'' 
                }        
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData() {
                const self = this;
                const Params = self.curPage + '/' + self.rows;
                getRmendList(Params).then((res) => {
                    // console.log(res);
                    self.tableData = res.data.rows;
                });             
            },
            //点击添加
            handleAdd(){
                sessionStorage.setItem('sub_title','添加课程');
                this.$router.push('/CourseAdd');
            },
            //上移
            movePrev(ornumber,id,index){
                let self = this;
                // console.log(ornumber,parseInt(id),index)
                if(index == 0){
                    self.$message.error('已经是最上面的一行了!');
                }else{
                   self.old.oldindex = index - 1;
                   self.old.oldid = self.tableData[self.old.oldindex].id;
                   self.old.oldornumber = self.tableData[self.old.oldindex].serial;
                    const Params = [{ 
                        id: id, 
                        serial: self.old.oldornumber
                    },{
                        id: self.old.oldid, 
                        serial: ornumber 
                    }];
                    rmendOrder(Params).then((res) => {
                        if(res.data.flag){
                            self.getData();
                        }; 
                    });
                }

            },
            //下移
            moveNext(ornumber,id,index){
                let self = this;
                // console.log(ornumber,id,index,self.tableData.length)
                if(index >= self.tableData.length-1){                
                    self.$message.error('已经是最后一行了!');
                    return false;
                }
                else{
                    self.old.oldindex = index + 1;
                    self.old.oldid = self.tableData[self.old.oldindex].id;
                    self.old.oldornumber=self.tableData[self.old.oldindex].serial;
                    const Params = [{ 
                        id: self.old.oldid, 
                        serial: ornumber
                    },{
                        id: id, 
                        serial: self.old.oldornumber
                    }]
                    rmendOrder(Params).then((res) => {
                        if(res.data.flag){
                            self.getData();
                        }; 
                    });
                }
            },
            //取消推荐
            handleCancel(id){
                const self = this;
                const Params = [{ 
                    id: id, 
                    isDisplay: 0               
                }];
                this.$confirm('是否取消课程推荐?', '提示', {
                    type: 'warning'
                }).then(() => {
                    rmendCancel(Params).then((res) => {
                        if(res.data.flag){
                            self.getData();
                            self.$message.success('取消推荐成功!');
                        };                       
                    });
                }).catch(() => {
                    // this.$message.info('已取消删除!');          
                });
            }
        }
    }
</script>

<style scoped>
    .panel-cont {
        overflow: hidden;
    }
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
        padding: 10px;
    }
</style>