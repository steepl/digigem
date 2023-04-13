<template>
	<div
		class="card flex flex-col relative bg-[#3f13004f] border-[#6d2405af] border-4 rounded-lg p-4 ease-in-out duration-200 min-h-[10rem]"
	>
		<div class="flex justify-start">
			<img
				class="h-4 w-4 mt-1 mr-2"
				:src="'https://www.google.com/s2/favicons?domain=' + resource.url"
				aria-hidden="true"
			/><a
				class="text-lg font-bold m-0 truncate"
				:href="resource.url"
				target="_blank"
				rel="noreferrer"
				>{{ resource.title }}</a
			>
		</div>
		<p
			class="flex content-stretch flex-auto flex-col text-sm text-white mt-2 mb-6 mx-0 leading-5 tracking-wide overflow-hidden text-ellipsis"
		>
			{{ resource.desc }}
		</p>
		<div class="flex justify-end">
			<a
				class="cursor-pointer flex self-end ml-3 text-sm leading-none text-white italic font-medium"
				@click="createCopyUrl(resource)"
				>Kopieer URL</a
			>
			<br />
			<p
				class="cursor-pointer flex self-end ml-3 text-sm leading-none text-white italic font-medium"
			>
				|
			</p>
			<a
				class="cursor-pointer flex self-end ml-3 text-sm leading-none text-white italic font-medium"
				:href="resource.url"
				target="_blank"
				rel="noreferrer"
				>Open</a
			>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		resource: {
			type: Object,
			required: true,
		},
		createCopyUrl: {
			type: Function,
			required: true,
		},
	},
};
</script>
