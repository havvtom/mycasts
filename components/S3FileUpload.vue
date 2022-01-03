<template>
	<div>
		<input type="file" name="" @change="uploadFile(fieldName, $event.target.files)">
	</div>
</template>

<script type="text/javascript">

	export default{
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
				form.append('image', files[0])

				let response = await this.$axios.post('image-upload', form)
				
				this.$set(this.video, fieldName, response.data);
				
			}
		}
	}
</script>