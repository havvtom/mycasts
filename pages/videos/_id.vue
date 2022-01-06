<template>
	<v-container>
		<v-row>
			<v-col md="9" cols="12">
				<client-only>
					<video-player
			                 ref="videoPlayer"
			                 :options="playerOptions"
			                 :playsinline="true"
			                 @ended="markAsPlayed"
			                 >
				  	</video-player>
				</client-only>
			</v-col>
			<v-col md="3" cols="12">
				<h1>{{video.name}}</h1>
				<div v-if="$auth.user">
					<div v-if="isPlayed" class="green--text"><v-icon class="mr-2" color="green">done</v-icon></span>Played</div>
					<div v-else>
						<v-btn x-small @click="markAsPlayed">Mark Played</v-btn>
					</div>
				</div>
				<div>
					{{ video.description }}
				</div>
				<span  v-for="tag in video.tags.data" :key="tag.slug">
				        <v-btn
				        	:to="{ name: 'tags-slug', params: { slug: tag.slug } }"
					      rounded
					      color="indigo darken-2"
					      class="ma-2"
					      small
					      dark
					    >
					      {{ tag.title }}
					    </v-btn>
			    </span>
			</v-col>
	    </v-row>
	</v-container>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	export default {
		data () {
			return {
				isPlayed: false,
			}
		},
		computed: {			
			playerOptions () {
				return {
		          // videojs options
		          language: 'en',
		          playbackRates: [0.7, 1.0, 1.5, 2.0],
		          sources: [{
		            type: "video/mp4",
		            src: this.video.videoUrl
		          }],
		          poster: this.video.thumbnail,
		          fluid: true        
		        }
			},
			...mapState(['playedVideos', 'videos', 'tags']),
			video () {
				return this.videos.find( v => v.id == this.$route.params.id )
			}
		},
		methods: {
			markAsPlayed () {
				this.isPlayed = true
				this.$store.dispatch( 'markAsPlayed', this.video.id )
			}
		},
		mounted () {
			if( this.$auth.user ){
				let playedVideos = JSON.parse(window.localStorage.playedVideos)
				this.isPlayed = playedVideos.includes( this.video.id )
			}
			
		},
	}
</script>
<style>
	
</style>