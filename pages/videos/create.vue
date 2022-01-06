<template>
	<v-container>
		<Admin/>
		<h1>Create a Video</h1>
		<v-form v-model="valid">
			<v-row>
				<v-col md="6">
				    <v-text-field
				      label="Video Title"
				      v-model="video.name"
				      :rules="[required('name'), maxLength('name', 50)]"
				    ></v-text-field>
				
					<v-textarea
					  v-model="video.description"
				      label="Description"
				      :rules="[required('description')]"
				      auto-grow			      
				    ></v-textarea>

				    <S3FileUpload :video="video" fieldName="thumbnail"/>
				    <v-text-field
				      label="Video Thumbnail Url"
				      v-model="video.thumbnail"
				      :rules="[required('video thumbnail')]"
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
				   <S3FileUpload :video="video" fieldName="videoUrl" />

				    <v-text-field
				      label="Video URL"
				      v-model="video.videoUrl"
				      :rules="[required('video Url')]"
				    ></v-text-field>

				    <v-btn @click="createVideo" :disabled="!valid">Create Video</v-btn>
				</v-col>
				<v-col md="6">
					<v-card width="340" hover>
						<v-img :src="video.thumbnail"></v-img>
							<client-only>
					          <div>
					            <v-card-title>{{ video.name }}</v-card-title>
					            <v-card-text>
					              <p>{{ video.description }}</p>
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
	        ...mapState(['videos', 'tags'])
	    },
		data () {
			return {
				valid: false,
				video: {
					name: "",
					description: "",
					thumbnail: "",
					videoUrl: "",
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
			async createVideo () {
				try {
					
					let response = await this.$axios.post('videos', this.video)

					this.$store.dispatch('setSnackbar', {
						showing: true,
						text: `You have successfully created a new video, ${response.data.data.name}`
					})
					
					await this.$store.dispatch('addVideo', response.data.data)
					
					this.$router.push({ name: 'videos-id', params: { id: response.data.data.id } })
				} catch (e) {
					
				}
			},
			
		}
	}
</script>

//validation
//make sure the slug is unique otherwise we get errors