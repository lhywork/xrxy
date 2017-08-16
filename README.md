# 星融学院后台管理




## 技术栈

Vue2 + Vue-router + Axios + Webpack + ES5/6 + Element-UI + Less 

# 效果演示

[查看demo请戳这里](http://xrxy.weipaidai.com.cn)（请用chrome手机模式预览）


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── dist                                        // 上线项目文件，放在服务器即可正常访问
├── node_modules                                
|
├─src                                            // 源码目录
|  ├─App.vue                                     // 页面入口文件
|  ├─main.js                                     // 程序入口文件，加载各种公共组件
|  ├─router
|  |   └──index.js
|  |
|  ├─components                                  //vue组件
|  |     ├─Page                                  //页面组件
|  |     |  ├─AdminAdd.vue
|  |     |  ├─AdminEdit.vue
|  |     |  ├─AdminRole.vue
|  |     |  ├─AppManage.vue
|  |     |  ├─AppManageAdd.vue
|  |     |  ├─AppManageEdit.vue
|  |     |  ├─CourseAdd.vue
|  |     |  ├─CourseCheck.vue
|  |     |  ├─CourseEdit.vue
|  |     |  ├─CourseList.vue
|  |     |  ├─CourseRmend.vue
|  |     |  ├─CourseType.vue
|  |     |  └──Login.vue
|  |     |
|  |     ├─Common                               //公共组件
|  |         ├─Header.vue
|  |         ├─Home.vue
|  |         └──Siderbar.vue
|  ├─assets                                     //配置文件
|  |   ├─logo.png
|  |   ├─css
|  |      ├─index.less
|  |      └──public
|  └──api                                       // 接口目录
|     └──index.js                               // 获取数据的统一调配文件，对接口进行统一管理
|  
├─static                                        //静态资源图片
|   ├─images
|  
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

