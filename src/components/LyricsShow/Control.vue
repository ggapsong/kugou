<template>
    <div class="m-bottom">
        <div class="m-progress-box">
            <span class="current-time">{{currentT}}</span>
            <div class="m-progress" ref="allLine">
                <div 
					class="m-progress-line"
					@click="jumpPoint"
				>
                	<div ref="lined" class="m-progress-lineed" :style="{width:endX}"></div>
                </div>
                <div ref="circle" 
					class="m-progress-circle" 
					:style="{transform: `translate3d(${endX},0,0)`}"
					@touchstart ="start"
					@touchmove="move"
					@touchend="end"
				></div>
            </div>
            <span class="total-time">{{totalTime}}</span>
        </div>
        <div class="m-play-control">
            <div class="m-play-btn" @click="changePrevSong">
                <img src="../../assets/image/prev.png" alt="">
            </div>
            <div class="m-play-play-btn">
				<img src="../../assets/image/play.png" v-if="!playing" alt="" @click="play">
				<img src="../../assets/image/stop.png" v-else alt="" @click="stop">
            </div>
            <div class="m-play-btn" @click="changeNextSong">
                <img src="../../assets/image/next.png" alt="">
            </div>
        </div>
  </div>
</template>

<script>

import {sToM} from '@/utils/utils'
export default {
	props:["playing","stop","play","duration","currentTime","changeNextSong","changePrevSong"],
	data(){
		return{
			drag:false,
			linedW:0,//播放过的宽度
			lineW:0, //播放条总宽度
			maxX:0,//最大值
			dragTime:0,//拖拽后的事件位置
			circleLeft:0
		}
	},
	mounted(){
		this.lineW = this.$refs.allLine.offsetWidth;
		this.maxX = this.lineW;
	},
	methods:{
		jumpPoint(event){
			this.linedW = event.clientX - this.$refs.allLine.getBoundingClientRect().left;
			this.dragTime = this.linedW/this.lineW*this.duration;
			this.$emit("dragTime",this.dragTime);
		},	
		changePlay(){
			this.$emit("changePlay",)
		},
		//手指按下
		start(e){
			this.drag = true;
		},
		//拖拽
		move(e){
			//获取时间条的left值
			let allLineL = this.$refs.allLine.getBoundingClientRect().left;
			this.circleLeft = this.linedW = e.changedTouches[0].pageX-allLineL
		},
		end(){
			this.drag = false;
			this.dragTime = this.linedW/this.lineW*this.duration
			this.$emit("dragTime",this.dragTime)
		},
	},
	computed:{
		//总时间
		totalTime(){
			return sToM(this.duration)
		},
		currentT(){
			return sToM(this.currentTime)
		},
		proportion(){
			return	parseInt(this.currentTime / this.duration * 100)  + "%" // 52.36%
		},
		//过界处理
		endX(){
            if(this.linedW<0){
                this.linedW=0;
            }else if(this.linedW>this.maxX){
                this.linedW=this.maxX;
			}
			return this.linedW+'px';
        }
	},
	watch:{
		currentTime:{
			handler(data){
				if(this.drag){
					return false
				}
				//比例 当前播放时间/总时间 * line.width = 当前lined.width
				this.linedW = data/this.duration*this.lineW
			}
		}
	}
}
</script>

<style>
.m-play-control .iconfont{ font-size: .5rem;}

    .m-bottom {
	width: 100%;
	position: absolute;
	bottom: .5rem;
	left: 0;
}

.m-progress-box {
	padding: 0 .2rem;
	box-sizing: border-box;
	font-size: .3rem;
	display: flex;
	align-items: center;
	color: #fff;
	
}

.m-progress-box span {
	width: 1rem;
}

.m-progress {
	width: 7rem;
	height: .44rem;
	margin: 0 .2rem;
	display: flex;
	align-items: center;
	position: relative;
	-overflow: hidden;
}

.m-progress-line {
	width: 100%;
	background:#9c8d88;
	height: .06rem;
	position: relative;
}

.m-progress-lineed {
	width: 0;
	background: #d23d43;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
}

.m-progress-circle {
	width: .3rem;
	height: .3rem;
	margin-top:0.06rem;
	background: #fff;
	position: absolute;
	left: -0.15rem;
	top: 0;
	border-radius: 50%;
	z-index: 2;
}

.m-play-control {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: .1rem;
}

.m-play-play-btn {
	width: 1rem;
	height: 1rem;
	background: #c84040;
	border-radius: 50%;
	margin: 0px .56rem;
}
.m-play-play-btn img{
    width: 0.4rem;
    margin: 0.28rem auto;
    text-align: center;
    display: block;
}
.m-play-btn img {
    width: 0.3rem;
    margin: 0.25rem auto;
    text-align: center;
    display: block;
}

.m-play-play-btn {
	font-size: .8rem;
	color: #fff;
	display: block;
	text-align: center;
	line-height: 1rem;
}

.m-play-btn {
	width: .85rem;
	height: .85rem;
	background: #c84040;
	border-radius: 50%;
}
</style>
