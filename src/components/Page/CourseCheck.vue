<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <div id="listform">
                <table class="table table-hover text-center">
                    <tbody>
                        <tr>
                            <th>章节序号</th>
                            <th>章节名称</th>
                            <th>类型</th>
                            <th>操作</th>
                            <th>上传时间</th>
                        </tr>
                    </tbody>
                    <tbody id="course-list">
                        <tr v-for="item in tableData">
                            <td>{{item.serial}}</td>
                            <td>{{item.name}}</td>                       
                            <td>{{item.type}}</td>
                            <td>
                                <div class="button-group">
                                    <a @click="handleCheck(item.type,item.url)" class="button border-green" href="javascript:void(0);" >
                                        <span class="icon-eye"></span>
                                        查看
                                    </a>
                                </div>
                            </td>
                            <td>{{item.updateTime}}</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <!-- <tr>
                            <td colspan="8">
                                <div class="pagelist" id="pagelist">
                                </div>
                            </td>
                        </tr> -->
                    </tbody>
                </table>              
            </div>
        </div>
    </div>
</template>

<script>
    import { getListChapter } from '@/api';
    export default {
        data() {
            return {
                title: "查看课程",
                page:1,
                rows:10,
                videoUrl:'',
                hideFalg:true,
                tableData: []
            }
        },
        created(){
            this.getData();
        },
        methods: {
            getData(){
                const self = this,
                    page = self.page,
                    rows = self.rows;
                const Params = page + '/' + rows + '/' + self.$route.query.id;
                getListChapter(Params).then((res) => {
                    self.tableData = res.data.rows;
                })
            },
            handleCheck(type,url){
                if(!url){
                    this.$alert('链接打开失败,文件正在后台上传中','系统后台提示');
                }else{
                    if(type=='视频'){
                        window.open(url);
                    }else{
                        window.open(this.BaseUrl + url);
                    }
                }              
            }
        }
    }
</script>

<style scoped>
    .video-mask{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0,0,0,.5);
    }
    .video-mask.hide{
        display: none;
    }
    .video-prew{
        position: absolute;
        top:50%;
        left: 50%;
        margin-left: -500px;
        margin-top: -250px;
    }
    table td {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #ccc;
        font-size: 14px;
        border-left: 0;
    }
    .panel{
        border-bottom: none; 
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
    }
</style>