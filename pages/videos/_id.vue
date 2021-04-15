<template>
	<div>
		<client-only>
		<video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 >
	  	</video-player>
	</client-only>
		<h1>{{video.name}}</h1>
		<div>
			{{ video.description }}
		</div>
		<span  v-for="tag in video.tags.data" :key="tag.slug">
	        <nuxt-link class="tag-button" :to="{ name: 'tags-slug', params: { slug: tag.slug } }">
		        {{ tag.slug }}
		    </nuxt-link>
	    </span>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				video: {}
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
		          poster: this.video.thumbnail	         
		        }
			}
		},
		async asyncData ({ app, params, store }) {
			let video = store.state.videos.find(vid=> vid.id == params.id)
			return {
				video: video
			}
		}
	}
</script>
<style>
	img {
		max-width: 60%;
	}
	.video-player-box .video-js{
		margin: auto;
		width: 800px;
		height: 600px;
	}
	.tag-button {
		background-color: #72C9A2;
		border-radius: 5px;
		padding: 5px;
		margin: 3px;
		font-size: 16px;
		cursor: pointer;
	}
</style>