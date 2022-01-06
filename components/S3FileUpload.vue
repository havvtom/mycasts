<template>
	<div>
		<div v-if="isLoading">
			<p class="uploading">Uploading your file, please wait...</p>
		</div>
		<div v-else>
			<input type="file" class="hide_file"  @change="uploadFile(fieldName, $event.target.files)">
		</div>	
	</div>
</template>

<script type="text/javascript">

	export default{
		data () {
			return {
				isLoading: false
			}
		},
		props: {
			fieldName:{
				required: true,
				type: String
			},
			video: {
				required: true,
				type: Object
			}			
		},
		methods:{
			async uploadFile(fieldName, files) {
				let form = new FormData()
				this.isLoading = true
				form.append('media', files[0])

				let response = await this.$axios.post('media-upload', form)
				this.isLoading = false
				// console.log(response)
				this.$set(this.video, fieldName, response.data);
				
			}
		}
	}
</script>
<style>
	.uploading{
		color: blue;
	}
</style>