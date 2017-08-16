<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="main-content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Siderbar.vue';
    export default {
        name: 'app',
        components: {
            vHead, 
            vSidebar
        }
    }
</script>

<style lang="less">
    .main-content {background: #fff;position: fixed;border-left: solid 1px #b5cfd9;right: 0;bottom: 0;top: 110px;left: 180px;padding: 15px;
        overflow: auto;border-top: 1px solid #b5cfd9;font-size: 14px;}

    .pagelist {padding:10px 0; text-align:center;}
    .pagelist span,.pagelist a{ border-radius:3px; border:1px solid #dfdfdf;display:inline-block; padding:5px 12px;cursor: pointer;}
    .pagelist a{ margin:0 3px;}
    .pagelist span.current{ background:#09F; color:#FFF; border-color:#09F; margin:0 2px;}
    .pagelist a:hover{background:#09F; color:#FFF; border-color:#09F; }
    .pagelist label{ padding-left:15px; color:#999;}
    .pagelist label b{color:red; font-weight:normal; margin:0 3px;}
    .el-pager li{
        padding: 0 10px;
    }
</style>