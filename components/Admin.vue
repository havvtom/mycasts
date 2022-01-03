<template>
	<div>
		<v-tabs>
			<v-tab :to="{ name: 'admin-videos' }">
				Videos
			</v-tab>
			<v-tab :to="{ name: 'admin-taglist' }">
				Tags
			</v-tab>
			<v-tab :to="{ name: 'admin-userlist' }">
				Users
			</v-tab>
		</v-tabs>
	</div>
</template>
<script type="text/javascript">
	export default{

	}
</script>