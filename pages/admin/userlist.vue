<template>
	<v-container>
		<Admin/>
		<div v-for="user in users" :key="user.id">
			{{ user.name }}
		</div>
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
			...mapState(['users'])
		}

	}
</script>