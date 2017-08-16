<template>
    <div id="app" class="main-wrapper">
        <router-view></router-view>
    </div>
</template>
<style>
	@import './assets/css/index.less';
	.wrapper{
		position: absolute;
		width: 100%;
		height: 100%;
	}
	[class*='el-icon-']:before {
	    font-family: inherit!important;
	}
	.el-upload-list{
		display: none;
	}
</style>
