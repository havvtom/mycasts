<template>
	<div>
		<a href="#" @click.prevent="login">Login</a>
		<a href="#" @click.prevent="logout">Logout</a>
	</div>
</template>

<script type="text/javascript">
	export default {
		methods: {
			login () {
				this.$auth.loginWith('laravelJWT', {
					data: {
						email: 'havvtom@gmail.com',
						password: 'password'
					}
				}).then( () => {
					this.$store.dispatch( 'setPlayedVideos', this.$auth.user.data.playedVideos )
				})
			},
			async logout () {
				await this.$auth.logout()
			}
		}
	}
</script>