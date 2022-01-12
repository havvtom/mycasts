<template>
	<v-card width="full" hover :to="{ name: 'videos-id', params: { id: video.id } }">
		<v-img :src="video.thumbnail"></v-img>
				<client-only>
          <div>
            <v-card-title>{{ video.name }}</v-card-title>
            <v-card-text>
              <p>{{ video.description }}</p>
              <div v-if="isPlayed" class="green--text"><v-icon class="mr-2" color="green">done</v-icon></span>Played</div>
            </v-card-text>
            <v-card-actions class="d-flex flex-wrap">
				        <span  v-for="tag in video.tags.data" :key="tag.slug" class="mb-2">
						        <v-btn
						        	:to="{ name:'tags-slug', params:{ slug: tag.slug } }"
							      rounded
							      color="indigo darken-2"
							      class="mr-2"
							      dark
							      small
							    >
							      {{ tag.title }}
							    </v-btn>
						    </span>
						</v-card-actions>
          </div>
        </client-only>
	</v-card>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				isPlayed: false
			}
		},
		props: {
			video: {
				type: Object,
				required: true
			}
		},
		mounted () {
			if( this.$auth.user ){
				let playedVideos = JSON.parse(window.localStorage.playedVideos)
				this.isPlayed = playedVideos.includes( this.video.id )
			}
		}
	}
</script>
<style scoped> 
   
</style>