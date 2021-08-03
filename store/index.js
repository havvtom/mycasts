export const state = () => ({
	videos: [],
  tags: []
})

export const getters = {
  videos( state ) {
    return state.videos
  },
  tags( state ) {
    return state.tags
  }
}

export const mutations = {
  SET_VIDEOS( state, videos ){
    state.videos = videos
  },
  SET_TAGS( state, tags ){
    state.tags = tags
  },
  SET_PLAYED_VIDEOS( state, videoIds ){
    state.playedVideos = videoIds
  }
}

export const actions = {

  setPlayedVideos({commit}, videoIds){
    commit('SET_PLAYED_VIDEOS', videoIds)
    window.localStorage.playedVideos = JSON.stringify(videoIds)
  },
  markAsPlayed({commit}, videoId){
    let playedVideos = JSON.parse(window.localStorage.playedVideos).concat( videoId )
    window.localStorage.playedVideos = JSON.stringify( playedVideos )
    this.$axios.post('mark/' + videoId)
  },
  async nuxtServerInit({ commit }) {
    let videos = await this.$axios.$get('/videos')
    let tags = await this.$axios.$get('/tags')

    commit ('SET_VIDEOS', videos.data)
    commit('SET_TAGS', tags.data)
  }
}