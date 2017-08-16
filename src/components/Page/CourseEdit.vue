<template>
    <div class="panel">
        <div class="panel-head">
            <h5><span class="icon-key"></span>{{title}}</h5>
        </div>
        <div class="panel-cont">
            <el-form class="form-x" v-model="course">
                <div class="form-group" :class="checkFlag ? 'check-error' : ''">
                    <div class="label">
                        <label>
                            课程名称：
                        </label>
                    </div>
                    <div class="field">
                        <input class="courseName input" placeholder="课程名称" v-model="course.name" type="text"/>
                        <div class="tipss" :class="msgFlag ? 'green' : 'red'" >
                            {{nameMsg}}
                        </div> 
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            是否推荐：
                        </label>
                    </div>
                    <div class="field" style="padding-top:12px;">
                        <el-radio class="radio" v-model="course.isDisplay" label="1">是</el-radio>
                        <el-radio class="radio" v-model="course.isDisplay" label="0">否</el-radio>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            课程类别：
                        </label>
                    </div>
                    <div class="field">
                        <el-form-item>
                            <el-select v-model="course.typeId" placeholder="请选择">
                                <el-option v-for="item in typeData" :label="item.name" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <div class="tipss" :class="typeIdFlag ? 'green' : 'red'" >
                            {{typeIdMsg}}
                        </div> 
                    </div>                                  
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                            课程图标：
                        </label>
                    </div>
                    <div class="field">
                        <el-upload class="upload-img" ref="upload" drag :action="imgUrl" :accept="accept" name="imgFile" :on-change="handleChange" :auto-upload="false" :http-request="handleRequest">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过500Kb</div>    
                        </el-upload>
                        <div class="img-preview" :class="course.imgUrl ? '' : 'hide'">
                            <img :src="course.imgUrl">
                            <p class="img-previewName">{{fileList.name}}</p>
                        </div>
                    </div>     
                </div>
                <div class="form-group" v-for="(item,index) in course.chapters" v-model="course.chapters">
                    <div class="label">
                        <label>
                            章节序号：
                        </label>
                    </div>
                    <div class="field">
                        <input class="chapterNum input" v-model="item.serial" type="text"/>
                        <div class="label chapterType">
                            <label>
                                章节类型：
                            </label>
                            <el-radio-group v-model="item.type">
                                <el-radio label="1">PDF</el-radio>
                                <el-radio label="2">视频</el-radio>
                                <el-radio label="3">考试</el-radio>
                            </el-radio-group> 
                        </div>
                        <div class="label labelName">
                            <label>
                                章节名称：
                            </label>                            
                        </div>
                        <input class="input chapterName" v-model="item.name" type="text"/>
                        <div class="upload-file">
                            <div class="el-upload el-upload--text el-upload-posit">
                                <button type="button" class="el-button el-button--primary" >
                                    <span>选择文件</span>                 
                                </button>
                                <input type="file" ref="fileinput" :accept="item.accept" name="file" class="el-upload-input" @change="onFileChange(index,item.id)">
                            </div> 
                                <button type="button" class="el-button" @click="uploadServer(index)" v-model="index" :disabled="item.disabled" :class="item.disabled ? 'is-disabled':'el-button--success'">
                                    <span>{{item.uploadText}}</span>
                                </button> 
                                <i title="单击删除这一行" class="el-icon-close" @click="handlechapterDel(index,item.id)"></i>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="label">
                        <label>
                        </label>
                    </div>
                    <div class="field">
                        <button class="button bg-main icon-plus-square-o" @click="handlechapterAdd()" type="button">
                            添加章节
                        </button>
                    </div>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { getCourseType,checkCourse,imagesUpload,getChapterId,filesUpload,getCourseInfo,delChapter,updateCourse } from '@/api';
    export default {
        data() {
            return {
                title: "编辑课程",
                id:'',
                imgUrl: '', 
                curPage: 1,
                rows: 10,
                typeData:[],
                nameMsg: '必填',
                typeIdMsg:'',
                checkFlag:false,
                msgFlag: false,
                typeIdFlag:false,
                imgFlag: true,
                index:'0',
                courseName:'',
                nameFlag:false,
                course:{                 
                    name:'',
                    isDisplay:'0',
                    typeId:'',
                    imgUrl:'',
                    chapters:[{
                        name:'',
                        serial:'',
                        type:'1',
                        url:'',
                        id:"",
                        fileId:'',
                        status: 0,
                        accept:'application/pdf',
                        uploadText:'上传到服务器',
                        disabled:false
                    }]      
                },
                acceptArr:["application/pdf",".flv",".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"],
                fileType:["pptFile","videoFile","excelFile"],
                accept:'image/gif,image/jpeg,image/jpg,image/png',
                fileList:{
                    name: '', 
                    imgUrl: ''
                }
            }
        },
        created(){
            this.id = this.$route.query.id;
            this.getData();
            this.getCourse();
        },
        methods: {
            //获取课程类别
            getData() {
                const self = this;
                getCourseType().then((res) => {
                    self.typeData = res.data;
                });
            },
            //获取课程信息
            getCourse() {
                const self = this;
                getCourseInfo(self.id).then((res) => {
                    let CourseData = res.data.data;
                    CourseData.isDisplay = res.data.data.isDisplay.toString();
                    if(CourseData.chapters){
                        CourseData.chapters.forEach(function(item){
                            item.accept = self.acceptArr[item.type-1];
                            item.status = 1,
                            item.disabled = false;
                            item.uploadText = '上传到服务器';                       
                        });
                    }    
                    self.courseName = CourseData.name;               
                    self.course = CourseData;
                    if(CourseData.imgUrl){
                        self.fileList.imgUrl = CourseData.imgUrl;
                        self.course.imgUrl = self.BaseUrl + CourseData.imgUrl; 
                    }                            
                });
            },
            //课程名称重复验证
            inputChange(courseName) {
                checkCourse(courseName).then((res) => {
                    if (res.data.flag && !this.nameFlag) {
                        this.nameMsg = '课程名称已存在！';
                        this.msgFlag = false;
                        this.checkFlag = true;
                    }else{
                        this.nameMsg = '课程名称可以使用'
                        this.msgFlag = true;
                        this.checkFlag = false;
                    }
                });
            },
            //点击上传图片
            handleChange(file, fileList) {
                const isJPG = file.name;
                const isLt2M = file.size / 1024  < 500;
                if(!/\.(gif|jpg|jpeg|png)$/.test(isJPG)){
                    this.msgAlert('上传课程图标只能是jpg/png/gif格式!');
                }
                else if (!isLt2M) {
                    this.msgAlert('上传课程图标大小不能超过 500K!');
                }else{
                    this.course.imgUrl = file.url;
                    this.fileList.name = file.name;
                    this.imgFlag = false;
                }       
            },
            //图片上传资源服务器
            handleRequest(response){
                let self = this;
                let formData = new FormData();
                    formData.append('imgFile',response.file);
                imagesUpload(formData).then((res) => {
                    if(res.data.flag){
                        self.uploadFile(res.data.data);
                    }else{
                        self.msgAlert(res.data.msg);
                    } 
                });
            },
            //选择文件
            onFileChange(index,chapterId){
                let self = this;
                let files = this.$refs.fileinput[index].files[0];
                let Course = this.course; 
                let acceptNum = Course.chapters[index].type;
                Course.chapters[index].accept = this.acceptArr[acceptNum];
                if(files){
                    try{
                        Course.chapters[index].name = files.name;
                        if(acceptNum == 1){
                           if(files.name.split(".")[1] != 'pdf'){ 
                                self.msgAlert('只允许上传pdf文件');
                                Course.chapters[index].name = ''; 
                           }else{
                                Course.chapters[index].name = files.name.replace(/(.*\/)*([^.]+).*/ig,"$2");  
                           }
                        }else if(acceptNum == 2){
                           if(files.name.split(".")[1] != 'flv'){
                                self.msgAlert('只允许上传flv格式文件');
                                Course.chapters[index].name = ''; 
                           }else{
                                Course.chapters[index].name = files.name.replace(/(.*\/)*([^.]+).*/ig,"$2");  
                           }

                        }else if(acceptNum == 3){
                           if(files.name.split(".")[1] != 'xls' && files.name.split(".")[1] != 'xlsx'){
                                self.msgAlert('只允许上传excel的考试文件');
                                Course.chapters[index].name = ''; 
                           }else{
                                Course.chapters[index].name = files.name.replace(/(.*\/)*([^.]+).*/ig,"$2");  
                           } 
                        } 
                    }catch(error) {
                　　   console.log(error)
                　　}               
                }             
                this.getChapterIds(index,chapterId);
            },
            //生成章节Id
            getChapterIds(index,chapterId){
                if(chapterId){
                    this.course.chapters[index].id = chapterId;
                }else{          
                    getChapterId().then((res) => {
                        if(res.data.flag){
                            this.course.chapters[index].id = res.data.data;
                        }           
                    }); 
                }
            },               
            //点击上传服务器按钮
            uploadServer(index){
                let self = this;
                let Course = self.course;
                self.index = index;
                if(!Course.name){
                    self.nameMsg = '课程名称不能为空！';
                    self.msgFlag = false;
                    self.checkFlag = true;              
                }else if(!Course.typeId){
                    self.typeIdMsg = '课程类别还没选择！';
                    self.typeIdFlag = false;
                }
                else if(!Course.chapters[index].serial){
                    self.msgAlert('章节序号不能为空！');
                }else if(!Course.chapters[index].name){
                    self.msgAlert('章节名称还没选择文件！');                 
                }else{
                    if(self.$refs.upload.uploadFiles.length){
                        self.$refs.upload.submit();
                    }else{
                        self.uploadFile(self.fileList.imgUrl);
                    }                             
                }
            },
            //上传文件
            uploadFile(imageUrl){
                let self = this;
                let Course = this.course;
                let Chapters = Course.chapters[this.index];
                let chapterId = Chapters.id;
                let chapterType = parseInt(Chapters.type);
                let type = chapterType-1;
                let fileType = this.fileType[type];
                let files = this.$refs.fileinput[this.index].files[0];
                let chapterUrl,fileId;
                //通过files判断章节是否是新增、修改                                          
                if(files){
                    let formData = new FormData();
                    formData.append(fileType,files);
                    formData.append("chapterId",chapterId);
                    Chapters.uploadText = "上传中..";
                    //文件上传到服务器
                    filesUpload(type,formData).then((res) => {
                        if(!res.data.flag){
                            this.msgAlert(res.data.msg);
                            Chapters.disabled = 'disabled';
                            Chapters.uploadText = "上传失败"; 
                        }else{
                            if(res.data.data.fileId){
                                Chapters.fileId = res.data.data.fileId;
                            }
                            if(res.data.data.sourceVideoUrl){
                                Chapters.url = res.data.data.sourceVideoUrl;
                            }else{
                                Chapters.url = res.data.data;
                            }
                            if(chapterType !== 2){ 
                                chapterUrl = Chapters.url;
                                fileId = Chapters.fileId;
                                this.handleCourseAdd(imageUrl,chapterUrl,fileId);
                            }                     
                        }             
                    }).catch(() => {
                        self.msgAlert("系统接口错误！");
                        Chapters.disabled = 'disabled';
                        Chapters.uploadText = "上传失败";
                    });
                    if(chapterType == 2){
                        if(files.name.split(".")[1] == 'flv'){
                            chapterUrl = '';
                            fileId = '';
                            this.handleCourseAdd(imageUrl,chapterUrl,fileId);
                        }else{
                            Chapters.disabled = 'disabled';
                            Chapters.uploadText = "上传失败";
                        } 
                    }               
                }else{
                    chapterUrl = Chapters.url;
                    fileId = Chapters.fileId;
                    this.handleCourseAdd(imageUrl,chapterUrl,fileId);
                }
            }, 
            //修改课程        
            handleCourseAdd(imageUrl,chapterUrl,fileId){
                let self = this;
                let Course = this.course;
                let Chapters = Course.chapters[self.index];
                let Params = {
                    id: self.id,
                    name: Course.name,
                    isDisplay: Course.isDisplay,
                    typeId: Course.typeId,
                    imgUrl: imageUrl,
                    chapters:[{
                        type: Chapters.type,
                        serial: Chapters.serial,
                        name: Chapters.name,
                        url: chapterUrl,
                        status: Chapters.status,                           
                        id: Chapters.id,
                        fileId: fileId
                    }]
                };
                updateCourse(self.id,Params).then((res) => {
                    if(res.data.flag){
                        self.$message.success(res.data.msg);
                        Chapters.disabled = 'disabled';
                        self.nameFlag = true;
                        Chapters.uploadText = "上传成功";
                        // self.$router.push('/CourseList');
                    }else{
                        self.msgAlert(res.data.msg);
                        Chapters.disabled = 'disabled';
                        Chapters.uploadText = "上传失败"; 
                    }
                }).catch(() => {
                    self.msgAlert("系统接口错误！");
                    Chapters.disabled = 'disabled';
                    Chapters.uploadText = "上传失败";
                });     
            },
            //删除章节
            handlechapterDel(index,chapterId){
                let self = this;
                let length = this.course.chapters.length;
                if(length == 1){
                    this.msgAlert('最后一条章节了不能进行删除！');
                    return false;
                }       
                if(chapterId){
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        delChapter(chapterId).then((res) => {
                            // console.log(res.data)
                            if (res.data.flag) {
                                this.getCourse();
                                this.$message.success('删除成功!');
                            }
                        });
                    });                                  
                }else{
                    this.course.chapters.splice(index,1);
                }
            },
            //添加章节
            handlechapterAdd(){
                if(!this.course.chapters){
                    this.course.chapters = [];
                }
                this.course.chapters.push({
                    name:'',
                    serial:'',
                    type:'1',
                    url:'',
                    id:"",
                    fileId:'',
                    status: 0,
                    accept:'application/pdf',
                    uploadText:'上传到服务器',
                    disabled:false
                });
            },
            //系统消息提示
            msgAlert(title){
                this.$alert(title,'系统后台提示', {
                    confirmButtonText: '确定'
                });
            }
        },
        watch: {
            course: {
                handler:function(course){
                    let self = this;
                    let courseName = course.name;
                    let chapter = course.chapters;
                    if(courseName){
                        if(courseName !== self.courseName){
                            this.inputChange(courseName);
                        }                   
                    }else{
                        this.nameMsg = '课程名称不能为空！';
                        this.msgFlag = false;
                        this.checkFlag = true;
                    };
                    if(chapter){
                        chapter.forEach(function(item,index){
                            item.accept = self.acceptArr[item.type-1]
                        });
                    }               
                },
                deep: true
            } 
        }
    }
</script>

<style scoped>
    .el-upload-posit{
        position: relative;
    }
    .el-button{
        position: relative;
    }
    .el-upload-input{
        position: absolute;
        width: 86px;
        height: 40px;
        top: 0px;
        left: 0;
        z-index: 10;
        opacity: 0;
        filter: alpha(opacity=0);
        font-size: 0;
    }
    .upload-file .el-icon-close{
        margin-left: 10px;
        cursor: pointer;
        color: #999988;
    }
    .el-upload-list{
        display: none;
    }
    .form-x .upload-img{
        float: left;
    }
    .form-x .img-preview.hide{
        display: none;
    }
    .form-x .img-preview img{
        width: 180px;
        height: 180px;
        display: inline-block;
        margin-left: 14px; 
    }
    .img-previewName{
        display: inline-block;
        color:#8391a5;
        margin-bottom: 0;
    }

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
        width: 288px;
        margin-left: 10px;
    }
    .form-x .form-group .labelName{
        width: 86px;
    }
    .form-x .form-group{
        min-width: 908px!important;
    }
    .form-x .form-group .field{
        min-width: 804px!important;
    }
    .label label{
        font-weight: 500;
    }
    .upload-file .el-button{
        padding: 13px 15px;
        margin-left: 8px;
    }
</style>