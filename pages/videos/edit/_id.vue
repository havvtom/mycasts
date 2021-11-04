<template>
	<v-container>
		<Admin/>
		<h1>Edit Video</h1>
		<v-form v-model="valid">
			<v-row>
				<v-col md="6">
				    <v-text-field
				      	label="Video Title"
				      	id="name"
				      	counter=50
				      	:value="activeVideo.name"
	          			@input.native="updateLocalVideo($event);"
	          			:rules="[required('name'), maxLength('name', 50)]"
				    ></v-text-field>
				
					<v-textarea
					  	:value="activeVideo.description"
	          			@input.native="updateLocalVideo($event);"
				      	label="Description"
				      	id="description"
				      	:rules="[required('description')]"
				      	auto-grow			      
				    ></v-textarea>

				    <v-text-field
				      	label="Video Thumbnail"
				      	id="thumbnail"
				      	:value="activeVideo.thumbnail"
				      	:rules="[required('video thumbnail')]"
	          			@input.native="updateLocalVideo($event);"
				    ></v-text-field>
				    <v-autocomplete
				    	inputId="tags"
				    	:items="tags"
				    	item-text="title"
				    	label="Tags"
				    	item-value="id" 
				    	multiple
				    	v-model="video.tags"
				    	chips
				    	deletable-chips
				    	hide-selected
				    >				    	
				    </v-autocomplete>
				    <!-- <v-select inputId="tags" :items="tags" item-text="title" label="Tags" item-value="id" multiple v-model="video.tags"  ></v-select> -->

				    <v-text-field
				      	label="Video URL"
				      	id="videoUrl"
				      	:value="activeVideo.videoUrl"
				      	:rules="[required('video Url')]"
	          			@input.native="updateLocalVideo($event);"
				    ></v-text-field>

				    <v-btn @click="updateVideo" :disabled="!valid">Save Video</v-btn>
				</v-col>
				<v-col md="6">
					<v-card width="340" hover>
						<v-img :src="activeVideo.thumbnail"></v-img>
							<client-only>
					          <div>
					            <v-card-title>{{ activeVideo.name }}</v-card-title>
					            <v-card-text>
					              <p>{{ activeVideo.description }}</p>
					            </v-card-text>
					          </div>
					        </client-only>
					</v-card>
				</v-col>
			</v-row>
		</v-form>

	</v-container>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	export default {
		middleware({ store, redirect, app }) {
	      // If the user is not authenticated
	     if( !app.$auth.user ){
	     	return redirect('/login')
	     }else if( !app.$auth.user.data.admin ){
	     	return redirect('/')
	     }
	  	},
		computed: {
	        ...mapState(['videos', 'tags']),
	        activeVideo () {
	        	return this.videos.find( v => v.id == this.$route.params.id )
	        }
	    },
		data () {
			return {
				valid: false,
				video: {
					tags: []
				},
				required(propertyName){
					return v => v && v.length > 2 || `Your ${propertyName} must be at least 3 characters long`
				},
				maxLength(propertyName, maxLength){
					return v => v && v.length <= maxLength || `Your ${propertyName} must be less than ${maxLength} characters long`
				} 
			}
		},
		methods: {
			updateLocalVideo (e) {
				// console.log(e.target.id, e.target.value)
				this.$set(this.video, e.target.id, e.target.value);
			},
			async updateVideo () {
				try {
					
					//merge the active video with video to get the updated version of the video
					let video = { ...this.activeVideo, ...this.video }; 
					
					let response = await this.$axios.patch(`videos/${video.id}`, video)
					this.$store.dispatch('setSnackbar', {
						showing: true,
						text: `You have successfully edited video, ${response.data.data.name}`
					})
					this.$store.dispatch('editVideo', response.data.data)
					
					this.$router.push({ name: 'videos-id', params: { id: response.data.data.id } })
				} catch (e) {
					
				}
			}
		}
	}
</script>
