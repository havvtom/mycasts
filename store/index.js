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
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    let videos = await this.$axios.$get('http://localhost:8000/api/videos')
    let tags = await this.$axios.$get('http://localhost:8000/api/tags')

    commit ('SET_VIDEOS', videos.data)
    commit('SET_TAGS', tags.data)
  }
}