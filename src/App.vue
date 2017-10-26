<template>
    <div id="app" class="main-wrapper">
    	<div class="page-loading" v-if="loading">
    		<div class="pace  pace-inactive">
				<div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
				  	<div class="pace-progress-inner"></div>
				</div>
				<div class="pace-activity"></div>
			</div>
    	</div>
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
  		name: 'app',
  		data() {
  			return {
  				loading:true
            }
  		},
        mounted :function(){
        	this.$nextTick(function () {
	        	// setTimeout(() => {
			      	this.loading = false;
			    // }, 1000);
		    }); 	
        }
  	}	
</script>
<style>
	@import './assets/css/index.less';
	@import './assets/css/loading.less';
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
