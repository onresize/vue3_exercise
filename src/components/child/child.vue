<template>
	<el-card>
		<div class="flex">
			<div class="box" v-for="(item, i) in list" :key="i">
				<div class="bb">
					<h3>name:{{ item.name }}</h3>
				</div>
				<div class="bb">
					<h3>title:{{ item.title }}</h3>
				</div>
				<div class="bb"><button @click="clickBtn(item.title)">触发事件给父组件</button></div>
			</div>
		</div>
	</el-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

let arr = reactive<number[]>([1, 4, 5]);
const getAA = () => {
	console.log(new Date().toLocaleDateString());
};

type obj = {
	name: string;
	title: string;
};
type props = {
	list?: obj[];
};

withDefaults(defineProps<props>(), {
	list: () => [{ name: 'name', title: '标题' }]
});

const emit = defineEmits(['getTitle']);
const clickBtn = (title: string): void => {
	emit('getTitle', title);
};

// 子组件中定义的arr数组通过defineExpose暴露给父组件、通过ref拿到这个属性
defineExpose({
	arr, // 数组属性
	getAA // 方法
});
</script>

<style scoped lang="less">
.flex {
	display: flex;
	justify-content: space-between;
}

.box {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	width: 200px;
	height: 200px;
	border-radius: 15px;
	border: 2px solid black;

	.bb {
		width: 100%;
		display: flex;
		justify-content: center;
	}
}
</style>
