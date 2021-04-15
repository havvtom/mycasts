<template>
  <div>
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">        
          <Video :video="video"/>        
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex'
  export default {
    computed: {
        ...mapState(['videos', 'tags'])
    },
  }
</script>
