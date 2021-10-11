<template>
	<v-container>
		<h1>Create a Video</h1>
		<v-row>
			<v-col md="6">
			    <v-text-field
			      label="Video Title"
			      v-model="video.name"
			    ></v-text-field>
			
				<v-textarea
				  v-model="video.description"
			      label="Description"
			      auto-grow			      
			    ></v-textarea>

			    <v-text-field
			      label="Video Thumbnail"
			      v-model="video.thumbnail"
			    ></v-text-field>

			    <v-select inputId="tags" :items="tags" item-text="title" label="Tags" item-value="id" multiple v-model="video.tags"  ></v-select>

			    <v-text-field
			      label="Video URL"
			      v-model="video.url"
			    ></v-text-field>

			    <v-btn @click="createVideo">Create Video</v-btn>
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
	</v-container>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	export default {
		computed: {
	        ...mapState(['videos', 'tags'])
	    },
		data () {
			return {
				video: {
					name: "",
					description: "",
					thumbnail: "",
					url: "",
					tags: []
				}
			}
		},
		methods: {
			async createVideo () {
				try {
					
					let response = await this.$axios.post('videos', this.video)
					
					await this.$store.dispatch('addVideo', response.data.data)
					
					this.$router.push({ name: 'videos-id', params: { id: response.data.data.id } })
				} catch (e) {
					
				}
			}
		}
	}
</script>

//validation
//make sure the slug is unique otherwise we get errors