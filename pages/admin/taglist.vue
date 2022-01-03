<template>
	<v-container>
		<Admin/>
		
		<template>
  <v-data-table
    :headers="headers"
    :items="tags"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Tags</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <!-- Tag edit modal -->

        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Tag
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                    	:value="editedItem.title"
                    	:rules="[required('name'), maxLength('name', 20)]"
                    	id="title"
                    	@input.native="updateLocalTag($event);"
                    	label="Tag name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

<!-- End of Tag Edit dialogue -->

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      	<v-btn
	        class="ma-2"
	        color="blue"
	        dark
	        small
	        @click="editItem(item)"
	      >
	        Edit
	        <v-icon
	          dark
	          right
	        >
	          edit
	        </v-icon>
	    </v-btn>
      
      	<v-btn
	        class="ma-2"
	        color="red"
	        dark
	        small
	        @click="deleteItem(item)"
	      >
	        Del
	        <v-icon
	          dark
	          right
	        >
	          delete
	        </v-icon>
	    </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
	</v-container>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'
	export default{
		middleware({ store, redirect, app }) {
	      // If the user is not authenticated
	     if( !app.$auth.user ){
	     	return redirect('/login')
	     }else if( !app.$auth.user.data.admin ){
	     	return redirect('/')
	     }
	  	},
		computed: {
			...mapState(['tags']),
			formTitle () {
		        return this.editedIndex === -1 ? 'New Tag' : 'Edit Tag'
		      },
		},
		data (){
			return {
				dialog: false,
		      	dialogDelete: false,
		      	required(propertyName){
					return v => v && v.length > 2 || `Your ${propertyName} must be at least 3 characters long`
				},
				maxLength(propertyName, maxLength){
					return v => v && v.length <= maxLength || `Your ${propertyName} must be less than ${maxLength} characters long`
				}, 
		      	headers: [
			        {
			          text: 'Tags',
			          align: 'start',
			          sortable: false,
			          value: 'title',
			        },
			        { text: 'Number of Videos', value: 'number_of_videos_tagged' },
			       
			        { text: 'Actions', value: 'actions', sortable: false },
			      ],
		      	editedIndex: -1,
		      	//this is for updating so that we don't update elements in the state
		      	tag: {},
		      	//this is set when we select an element to update
		      	editedItem: {},
		      	defaultItem: {
		        name: ''
		      },
			}
		},
		
	    methods: {
	    	updateLocalTag (e) {
				this.$set(this.tag, e.target.id, e.target.value);
			},

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = item
        this.dialog = true
      },

      deleteItem (item) {
      	//this.editedItem works for both the edit and delete
        this.editedIndex = item.id
        this.editedItem = item
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.closeDelete()
				
		this.$store.dispatch('deleteTag', this.editedItem)

		// this.$store.dispatch('setSnackbar', {
		// 		showing: true,
		// 		text: `You have successfully deleted video, ${this.itemToDelete.name}`
		// 	})
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.tag = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.tag = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
      	if (this.editedIndex === -1) {
          //Refer to video edit to change vuex element outside mutation
	      	
	      	try{
	      		////////Adding Tag

	      		// Make the change on the server and get response
	      		let response = await this.$axios.post(`tags`, this.tag)
	      		// Make the change in vuex
		      	this.$store.dispatch('addTag', response.data.data)
		      	//close the dialog box
		        this.close()
	      	}catch(e){
	      		this.close()
	      		
	      		this.$store.dispatch('setSnackbar', {
						showing: true,
						color: "error",
						text: `There was an error saving your tag`
					})
	      	}	      	
        }else{
        	////////Editing Tag

        	//merge the editedItem(tag) with tag to get the updated version of the tag
					let tag = { ...this.editedItem, ...this.tag };

        	//Refer to video edit to change vuex element outside mutation
	      	
	      	// Make the change on the server and get response
	      	let response = await this.$axios.patch(`tags/${this.editedItem.id}`, this.tag)
	      	
	      	// Make the change in vuex
	      	this.$store.dispatch('editTag', response.data.data)

	      	//close the dialog box
	        this.close()
        }
      	
      },
    },
  }

	
</script>