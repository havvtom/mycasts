export const state = () => ({
	videos: [],
  tags: [],
  users: [],
  snackbar: {
    showing: false,
    text: 'Testing'
  }
})

export const getters = {
  videos( state ) {
    return state.videos
  },
  tags( state ) {
    return state.tags
  },
  users( state ) {
    return state.users
  }
}

export const mutations = {
  SET_VIDEOS_CURRENT_PAGE( state, page ){
    state.videos.meta.current_page = page
  },
  SET_VIDEOS( state, videos ){
    state.videos = videos
  },
  SET_TAGS( state, tags ){
    state.tags = tags
  },
  SET_USERS( state, users ){
    state.users = users
  },
  SET_SNACKBAR( state, snackbar ){
    state.snackbar = snackbar
  },
  SET_PLAYED_VIDEOS( state, videoIds ){
    state.playedVideos = videoIds
  },
  ADD_VIDEO( state, video ){
    let videos = state.videos.concat(video)
    state.videos = videos
  },
  ADD_TAG( state, tag ){
    let tags = state.tags.concat(tag)
    state.tags = tags
  },
  DELETE_TAG( state, tagId ){
    let tags = state.tags.filter( t => t.id != tagId)
    state.tags = tags
  },
  DELETE_VIDEO( state, videoId ){
    let videos = state.videos.filter( v => v.id != videoId)
    state.videos = videos
  },
  EDIT_TAG( state, tag ){
    //to figure a way to update the state videos with this tag
    let tIndex = state.tags.findIndex( t => t.id == tag.id )
     state.tags = [
      ...state.tags.slice(0, tIndex),
      tag,
      ...state.tags.slice(tIndex + 1)
    ]
  },
  EDIT_VIDEO( state, video ){
    let vIndex = state.videos.findIndex( v => v.id == video.id )
     state.videos = [
      ...state.videos.slice(0, vIndex),
      video,
      ...state.videos.slice(vIndex + 1)
    ]
  }
}

export const actions = {
  setVideosCurrentPage({commit}, page){
    commit('SET_VIDEOS_CURRENT_PAGE', page)
  },
  setPlayedVideos({commit}, videoIds){
    commit('SET_PLAYED_VIDEOS', videoIds)
    window.localStorage.playedVideos = JSON.stringify(videoIds)
  },
  markAsPlayed({commit}, videoId){
    let playedVideos = JSON.parse(window.localStorage.playedVideos).concat( videoId )
    window.localStorage.playedVideos = JSON.stringify( playedVideos )
    this.$axios.post('mark/' + videoId)
  },
  addVideo({commit}, video){
    commit('ADD_VIDEO', video)
  },
  addTag({commit}, tag){
    commit('ADD_TAG', tag)
  },
  setSnackbar({commit}, snackbar){
    commit('SET_SNACKBAR', snackbar)
  },
  editTag({commit}, tag){
    commit('EDIT_TAG', tag)
  },
  async editVideo({commit}, video){
    commit('EDIT_VIDEO', video)
  },
  async setVideos({commit}, videos){
    commit('SET_VIDEOS', videos)
  },
  async deleteTag({commit}, tag){
    //delete video from server
    await this.$axios.$delete(`tags/${tag.id}`)
    //delete video from state
    commit('DELETE_TAG', tag.id)
  },
  async deleteVideo({commit}, video){
    //delete video from server
    await this.$axios.$delete(`videos/${video.id}`)
    //delete video from state
    commit('DELETE_VIDEO', video.id)
  },
  async nuxtServerInit({ commit }) {
    let videos = await this.$axios.$get('/videos')
    let tags = await this.$axios.$get('/tags')
    let users = await this.$axios.$get('/users')
    
    commit ('SET_VIDEOS', videos)
    commit('SET_TAGS', tags.data)
    commit('SET_USERS', users.data)
  }
}