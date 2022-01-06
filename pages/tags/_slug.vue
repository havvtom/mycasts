<template>
	<div>
		<h1 class="display-2 d-flex justify-center ma-4">{{$route.params.slug}}</h1>
		<div class="d-flex flex-wrap">
			<div v-for="video in videos" :key="video.id" >
				<Video :video="video" class="ma-2"/>      
			</div>
		</div>
		<Paginate :meta="meta" v-on:switched="getVideos"/>
	</div>
</template>
<!-- <template>
  <div>
    <h1 class="display-2 ma-4 d-flex justify-center">All Videos</h1>
    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">        
          <Video :video="video" class="ma-2"/>        
      </div>
    </div>
    <Paginate :meta="meta" v-on:switched="getVideos"/>
  </div>
</template> -->

<script type="text/javascript">
	export default {
		data () {
			return {
				videos: [],
				meta: {}
			}
		},
		methods: {
	      async getVideos ( page = this.$route.query.page ) {
	        let videos = await this.$axios.$get(`videos?tag=${this.$route.params.slug}`, { 
	          params: {
	              page
	            }
	           })
	        this.videos = videos.data 
	        this.meta = videos.meta
	        this.$store.dispatch( 'setVideos', this.videos )
	      }
	    },
	    mounted(){
	      this.getVideos()
	    }
	}
</script>