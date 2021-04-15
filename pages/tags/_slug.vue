<template>
	<div>
		Pano pama tags
		<div v-for="video in videos" :key="video.id">
			<Video :video="video"/>      
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				videos: []
			}
		},
		async asyncData ({ app, params, store }){
			
			let videos = store.state.videos.filter( (vid) => {
						let tags = vid.tags.data.map( t => t.slug )
						if( tags.includes(params.slug) ){
							return vid
						} 
					} )
			return {
				videos: videos
			}
		}
	}
</script>