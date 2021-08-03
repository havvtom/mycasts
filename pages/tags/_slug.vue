<template>
	<div>
		<h1 class="display-2 d-flex justify-center ma-4">{{$route.params.slug}}</h1>
		<div class="d-flex flex-wrap">
			<div v-for="video in videos" :key="video.id" class="ma-2">
				<Video :video="video"/>      
			</div>
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