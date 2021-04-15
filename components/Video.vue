<template>
	<div class="video-box">
		<img :src="video.thumbnail">
          <div>
          	<nuxt-link :to="{ name: 'videos-id', params: { id: video.id } }">
	            <h3>{{ video.name }}</h3>
	            <div>
	              {{ video.description }}
	            </div>
	        </nuxt-link>
            <span  v-for="tag in video.tags.data" :key="tag.slug">
		        <nuxt-link class="tag-button" :to="{ name:'tags-slug', params:{ slug: tag.slug } }">
			        {{ tag.title }}
			    </nuxt-link>
		    </span>
          </div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data () {
			return {
				
			}
		},
		props: {
			video: {
				type: Object,
				required: true
			}
		}
	}
</script>
<style scoped> 
  .video-box{
    border: 1px solid white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
  }
    img {
    border-style: none;
    height: 150px;
    width: 150px;
    padding: 10px;
  }
</style>