<template>
	<v-container>
		<Admin/>
		<v-btn class="ma-2" color="blue"  :to="{ name: 'videos-create' }" >Add Video</v-btn>

		  	<template>
			  <v-card>
			    <v-card-title>
			      <v-text-field
			        v-model="search"
			        append-icon="mdi-magnify"
			        label="Search"
			        single-line
			        hide-details
			      ></v-text-field>
			    </v-card-title>
			    <v-data-table
			      :headers="headers"
			      :items="videos"
			      :search="search"
			    >
			    	<template v-slot:item.action="{ item }">
					   <v-btn
					        class="ma-2"
					        color="red"
					        dark
					        small
					        @click="deleteVideo(item)"
					      >
					        Del
					        <v-icon
					          dark
					          right
					        >
					          delete
					        </v-icon>
					    </v-btn>
					    <v-btn
					        class="ma-2"
					        color="blue"
					        dark
					        small
					        :to="{ name: 'videos-edit-id' , params: { id:item.id }}"
					      >
					        Edit
					        <v-icon
					          dark
					          right
					        >
					          edit
					        </v-icon>
					    </v-btn>
					   
					</template>
			    </v-data-table>
			  </v-card>
			</template>

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
	    		search: '',
	    		headers: [
		          {
		            text: 'Name',
		            align: 'start',
		            sortable: false,
		            value: 'name',
		          },
		          { text: 'Description', value: 'description' },
		          { text: 'Actions', value: 'action' },
		          
		        ],

      		}
		},
		methods: {
			deleteVideo(video){
				this.$store.dispatch('deleteVideo', video)

				this.$store.dispatch('setSnackbar', {
						showing: true,
						text: `You have successfully deleted video, ${video.name}`
					})
			}
		}	   

	}
</script>