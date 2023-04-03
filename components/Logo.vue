<template>
	<div
		class="logo flex flex-row items-center justify-center cursor-pointer"
		@click="goToHome"
	>
		<img
			class="bg-cover w-[45px] h-[45px]"
			src="~/assets/logo.png"
			alt="Digigem Logo"
		/>
		<h1 class="m-0 ml-3 text-3xl font-black uppercase">Digigem</h1>
	</div>
</template>

<script>
export default {
	methods: {
		goToHome() {
			this.$router.push("/");
		},
	},
};
</script>
