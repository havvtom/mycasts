<template>
  <div>
    <h1 class="display-2 ma-4 d-flex justify-center">All Videos</h1>
    <div class="d-flex flex-wrap">
      <div v-for="video in videos" :key="video.name">        
          <Video :video="video" class="ma-2"/>        
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapState } from 'vuex'
  export default {
    computed: {
        ...mapState(['videos', 'tags'])
    }
  }
</script>
