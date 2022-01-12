<template>
  <div>
    <h1 class="display-2 ma-4 d-flex justify-center">All Videos</h1>
    <v-row>
      <v-col v-for="video in videos" :key="video.name" md="6" lg="4">        
          <Video :video="video" class="ma-2"/>        
      </v-col>
    </v-row>
    <Paginate :meta="meta" v-on:switched="getVideos"/>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        videos: [],
        meta: {}
      }
    },
    computed: {
        ...mapState(['tags'])
    },
    methods: {
      async getVideos ( page = this.$route.query.page ) {
        let videos = await this.$axios.$get(`videos`, { 
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
