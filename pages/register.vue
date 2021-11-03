<template>
	<v-container>
		<v-form v-model="valid">
			<v-row>
				<v-col >
				    <v-text-field
				      	label="Name"
				    	v-model="form.name"
				    	:rules="[required('name')]"
				    ></v-text-field>
				    <v-text-field
				      	label="Email"
				    	v-model="form.email"
				    	:rules="[required('email address'), validEmailAddress()]"
				    ></v-text-field>

				    <v-text-field
				      	label="Password"
				      	v-model="form.password"
				      	:rules="[required('password')]"
				      	:type="showPassword ? 'text' : 'password'"
				      	
				    ></v-text-field>

				    <v-text-field
				      	label="Confirm Password"
				      	v-model="form.password_confirmation"
				      	:rules="[required('password confirmation'), passwordConfirmationRule()]"
				      	:type="showPassword ? 'text' : 'password'"
				      	:append-icon="showPassword ? 'visibility' : 'visibility_off'"
				      	@click:append="showPassword = !showPassword"
				    ></v-text-field>

				    <v-btn @click="register" :disabled="!valid">Register</v-btn>
				    <v-alert
				    	class="mt-5"
				    	v-if="errors"
					  	color="red"
					  	dismissible
					  	type="error"
					>{{errors}}</v-alert>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script type="text/javascript">
	export default {
		data () {
			return {
				valid: false,
				showPassword: false,
				errors: '',
				form: {},
				errors: '',
				required(propertyName){
					return v => v && v.length > 0 || `You must enter your ${propertyName}`
				},
				passwordConfirmationRule() {
			      return () => (this.form.password === this.form.password_confirmation) || 'Password must match'
			    },
				validEmailAddress(){
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      				return v => pattern.test(v) || 'Invalid e-mail.';
				}
			}
		},
		methods: {
			async register () {
				try {
					let response = await this.$axios.post('user', this.form)
					this.$auth.loginWith('laravelJWT', {
						data: {
								email: this.form.email,
								password: this.form.password
							}
						}).then( () => {
							// this.$store.dispatch( 'setPlayedVideos', this.$auth.user.data.playedVideos )
							this.$store.dispatch('setSnackbar', {
								showing: true,
								text: `You have successfully registered`
							})
						})
					 
					// console.log(response.data.data)

				} catch (e) {
					if( e.response.status === 422 ){
						this.errors = e.response.data.errors.email[0]
					}
				}
			}
		}
	}
</script>