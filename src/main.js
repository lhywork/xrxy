// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
// import ElementUI from 'element-ui';
import {
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Tooltip,
  prompt,
  Form,
  FormItem,
  Alert,
  Icon,
  Upload,
  Scrollbar,
  MessageBox,
  Message,
} from 'element-ui'

import 'element-ui/lib/theme-default/index.css';    // 默认主题
import "babel-polyfill";
// import './assets/css/index.less';

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Tooltip);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Scrollbar);


Vue.config.productionTip = false; //设置为 false 以阻止 vue 在启动时生成生产提示
Vue.prototype.$axios = axios;
// Vue.prototype.BaseUrl = '//192.168.1.100:8090';
Vue.prototype.BaseUrl = '//xrxy.weipaidai.com.cn:8080'; 
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  	el: '#app', /*最后效果将会替换页面中id为app的div元素*/
  	router, /*使用路由*/
  	template: '<App/>', /*告知页面这个组件用这样的标签来包裹着,并且使用它*/
  	components: { App } /*告知当前页面想使用App这个组件*/
});

